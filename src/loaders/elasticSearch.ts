import { BaseLoader } from "./base";
import { Client } from "@elastic/elasticsearch";
import { elasticSearchConfig } from "../config/elasticSearch";

const { ELASTICSEARCH_URL, ELASTICSEARCH_USER, ELASTICSEARCH_PASSWORD } =
  elasticSearchConfig;

export class ElasticSearchLoader extends BaseLoader {
  static elasticSearchInstance: Client;

  constructor() {
    super("ElasticSearchLoader");
  }

  protected async load(): Promise<Client> {
    const elasticSearchClient = new Client({
      node: ELASTICSEARCH_URL,
      auth: {
        username: ELASTICSEARCH_USER,
        password: ELASTICSEARCH_PASSWORD,
      },
    });

    ElasticSearchLoader.elasticSearchInstance = elasticSearchClient;

    return elasticSearchClient;
  }
}
