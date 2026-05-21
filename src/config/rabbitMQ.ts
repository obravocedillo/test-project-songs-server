export interface IRabbitMQConfig {
  RABBITMQ_URL: string;
  RABBITMQ_PROTOCOL: string;
  RABBITMQ_PORT: number;
  RABBITMQ_USERNAME: string;
  RABBITMQ_PASSWORD: string;
}

export const rabbitMQConfig: IRabbitMQConfig = {
  RABBITMQ_URL: process.env.RABBITMQ_URL ?? "",
  RABBITMQ_PROTOCOL: process.env.RABBITMQ_PROTOCOL ?? "",
  RABBITMQ_PORT: parseInt(process.env.RABBITMQ_PORT as string) ?? 5672,
  RABBITMQ_USERNAME: process.env.RABBITMQ_USERNAME ?? "",
  RABBITMQ_PASSWORD: process.env.RABBITMQ_PASSWORD ?? "",
};
