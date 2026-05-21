export interface IElasticSearchConfig {
  ELASTICSEARCH_URL: string;
  ELASTICSEARCH_USER: string;
  ELASTICSEARCH_PASSWORD: string;
}

export const elasticSearchConfig: IElasticSearchConfig = {
  ELASTICSEARCH_URL: process.env.ELASTICSEARCH_URL ?? "",
  ELASTICSEARCH_USER: process.env.ELASTICSEARCH_URL ?? "",
  ELASTICSEARCH_PASSWORD: process.env.ELASTICSEARCH_URL ?? "",
};
