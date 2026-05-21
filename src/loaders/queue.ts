import client, { ChannelModel } from "amqplib";
import { BaseLoader } from "./base";
import { rabbitMQConfig } from "../config/rabbitMQ";

const {
  RABBITMQ_URL,
  RABBITMQ_PROTOCOL,
  RABBITMQ_PORT,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD,
} = rabbitMQConfig;

export class QueuesLoader extends BaseLoader {
  static rabbitMQInstance: ChannelModel;

  constructor() {
    super("QueueLoader");
  }

  protected async load(): Promise<ChannelModel> {
    QueuesLoader.rabbitMQInstance = await client.connect({
      protocol: RABBITMQ_PROTOCOL,
      hostname: RABBITMQ_URL,
      port: RABBITMQ_PORT,
      username: RABBITMQ_USERNAME,
      password: RABBITMQ_PASSWORD,
    });

    return QueuesLoader.rabbitMQInstance;
  }
}
