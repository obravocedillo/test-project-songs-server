import {
  artistSearchRepository,
  IArtistSearch,
} from "../repositories/elasticSearch/artist";
import {
  genreSearchRepository,
  IGenreSearch,
} from "../repositories/elasticSearch/genre";
import {
  ISongsSearch,
  songsSearchRepository,
} from "../repositories/elasticSearch/songs";
import { ElasticSearchQueueService } from "../services/queue/elasticSearchQueue";
import { BaseLoader } from "./base";

export class ElasticSearchQueuesLoader extends BaseLoader {
  static artistQueue: ElasticSearchQueueService<IArtistSearch>;
  static songQueue: ElasticSearchQueueService<ISongsSearch>;
  static genreQueue: ElasticSearchQueueService<IGenreSearch>;

  constructor() {
    super("ElasticSearchQueuesLoader");
  }

  protected async load(): Promise<void> {
    ElasticSearchQueuesLoader.artistQueue =
      await ElasticSearchQueueService.create(artistSearchRepository, "artist");

    ElasticSearchQueuesLoader.songQueue =
      await ElasticSearchQueueService.create(songsSearchRepository, "song");

    ElasticSearchQueuesLoader.genreQueue =
      await ElasticSearchQueueService.create(genreSearchRepository, "genre");
  }
}
