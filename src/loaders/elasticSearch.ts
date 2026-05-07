import { BaseLoader } from "./base";
import { Client } from "@elastic/elasticsearch";

export class ElasticSearchLoader extends BaseLoader {
  static elasticSearchInstance: Client;

  constructor() {
    super("ElasticSearchLoader");
  }

  protected async load(): Promise<Client> {
    const elasticSearchClient = new Client({
      node: process.env.ELASTICSEARCH_URL || "",
      auth: {
        username: process.env.ES_USER || "",
        password: process.env.ES_PASSWORD || "",
      },
    });

    ElasticSearchLoader.elasticSearchInstance = elasticSearchClient;

    return elasticSearchClient;
  }
}
