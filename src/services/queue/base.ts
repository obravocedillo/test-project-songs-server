import { Channel, ChannelModel } from "amqplib";
import { baseLogger } from "../logger/factory";

export interface IQueueConsumer<T = Record<string, any>> {
  queue: string;
  handler: (msg: T) => Promise<void>;
  maxRetries?: number;
}

export abstract class BaseQueueService {
  protected abstract consumers: IQueueConsumer<any>[];
  protected channel!: Channel;
  protected queueLogger = baseLogger.createChildLogger("QueueService");

  protected async init(connection: ChannelModel): Promise<void> {
    this.channel = await connection.createChannel();

    await this.channel.prefetch(1);

    await this.channel.assertExchange("dead-letters", "direct", {
      durable: true,
    });

    this.channel.on("error", (err) => {
      this.queueLogger.error("Channel error", { error: err.message });
    });

    for (const consumer of this.consumers) {
      const { maxRetries = 3, queue, handler } = consumer;

      await this.channel.assertQueue(queue, {
        durable: true,
        arguments: {
          "x-dead-letter-exchange": "dead-letters",
          "x-message-ttl": 30000,
          "x-max-retries": maxRetries,
        },
      });

      this.channel.consume(
        queue,
        async (msg) => {
          if (!msg) {
            return;
          }

          const deathCount =
            msg.properties.headers?.["x-death"]?.[0]?.count ?? 0;
          if (deathCount >= maxRetries) {
            this.channel.ack(msg);
            return;
          }

          try {
            await handler(JSON.parse(msg.content.toString()));
            this.channel.ack(msg);
          } catch (error) {
            this.queueLogger.error("Consumer failed", {
              queue: queue,
              error: error instanceof Error ? error.message : String(error),
            });
            this.channel.nack(msg, false, true);
          }
        },
        { noAck: false },
      );
    }
  }

  publish(queue: string, message: Record<string, any>): void {
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }
}
