import { Client } from "@elastic/elasticsearch";
import { ElasticSearchLoader } from "../../loaders/elasticSearch";
import {
  DeleteResponse,
  MappingTypeMapping,
  QueryDslQueryContainer,
  UpdateResponse,
} from "@elastic/elasticsearch/lib/api/types";
import { IBaseLogger } from "../../services/logger/base";
import { baseLogger } from "../../services/logger/factory";

interface IBaseSearchRepository<T> {
  find(query: QueryDslQueryContainer): Promise<T[]>;
  create(id: string, data: T): Promise<T>;
  update(id: string, document: Partial<T>): Promise<UpdateResponse<T>>;
  delete(id: string): Promise<DeleteResponse>;
}

export class BaseSearchRepository<T> implements IBaseSearchRepository<T> {
  protected indexName: string;
  protected client: Client;
  protected repositoryLogger: IBaseLogger;

  constructor(indexName: string, mappings: MappingTypeMapping) {
    this.indexName = indexName;
    this.client = ElasticSearchLoader.elasticSearchInstance;
    this.repositoryLogger = baseLogger.createChildLogger("searchRepository");

    this.initIndex(mappings);
  }

  private async initIndex(mappings: MappingTypeMapping) {
    const exists = await this.client.indices.exists({ index: this.indexName });
    if (!exists) {
      await this.client.indices.create({ index: this.indexName, mappings });
    } else {
      this.repositoryLogger.info(`Index ${this.indexName} already exists`);
    }
  }

  async find(query: QueryDslQueryContainer): Promise<T[]> {
    const results = await this.client.search<T>({
      index: this.indexName,
      query,
    });

    return results.hits.hits.map((hit) => {
      return hit._source as T;
    });
  }

  async create(id: string, data: T): Promise<T> {
    const result = await this.client.index<T>({
      index: this.indexName,
      id,
      document: data,
    });

    return result as T;
  }

  async update(id: string, document: Partial<T>): Promise<UpdateResponse<T>> {
    const result = await this.client.update<T, Partial<T>>({
      index: this.indexName,
      id,
      doc: document,
    });

    return result as UpdateResponse<T>;
  }

  async delete(id: string): Promise<DeleteResponse> {
    const result = await this.client.delete({
      index: this.indexName,
      id,
    });

    return result;
  }
}
