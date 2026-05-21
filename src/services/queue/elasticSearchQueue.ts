import { QueuesLoader } from "../../loaders/queue";
import { BaseSearchRepository } from "../../repositories/elasticSearch/base";
import { BaseQueueService, IQueueConsumer } from "./base";

interface IElasticSearchMessage<T> {
  id: string;
  document?: T;
}

export class ElasticSearchQueueService<TSearchModel> extends BaseQueueService {
  private searchRepository: BaseSearchRepository<TSearchModel>;
  private _queuePrefix: string;

  protected consumers: IQueueConsumer<IElasticSearchMessage<TSearchModel>>[];

  constructor(
    searchRepository: BaseSearchRepository<TSearchModel>,
    queuePrefix: string,
  ) {
    super();
    this.searchRepository = searchRepository;
    this._queuePrefix = queuePrefix;
    this.consumers = [
      { queue: `elasticsearch-${queuePrefix}-save`, handler: this.handleSave },
      {
        queue: `elasticsearch-${queuePrefix}-update`,
        handler: this.handleUpdate,
      },
      {
        queue: `elasticsearch-${queuePrefix}-delete`,
        handler: this.handleDelete,
      },
    ];
  }

  static async create<T>(
    searchRepository: BaseSearchRepository<T>,
    queuePrefix: string,
  ): Promise<ElasticSearchQueueService<T>> {
    const instance = new ElasticSearchQueueService(
      searchRepository,
      queuePrefix,
    );
    await instance.init(QueuesLoader.rabbitMQInstance);

    return instance;
  }

  private handleSave = async (msg: IElasticSearchMessage<TSearchModel>) => {
    const { id, document } = msg;

    if (document) {
      await this.searchRepository.create(id, document);
    }
  };

  private handleUpdate = async (msg: IElasticSearchMessage<TSearchModel>) => {
    const { id, document } = msg;

    if (document) {
      await this.searchRepository.update(id, document);
    }
  };

  private handleDelete = async (msg: IElasticSearchMessage<TSearchModel>) => {
    const { id } = msg;

    await this.searchRepository.delete(id);
  };

  get queuePrefix(): string {
    return this._queuePrefix;
  }
}
