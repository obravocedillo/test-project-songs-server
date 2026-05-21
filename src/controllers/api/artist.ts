import { Artist } from "../../generated/prisma/client";
import { ArtistCreateInput } from "../../generated/prisma/models";
import { artistRepository } from "../../repositories/prisma/artist";
import {
  artistSearchRepository,
  IArtistSearch,
} from "../../repositories/elasticSearch/artist";
import { BaseCrudController } from "./baseCrud";
import { ElasticSearchQueuesLoader } from "../../loaders/elasticSearchQueues";

class ArtistController extends BaseCrudController<
  Artist,
  ArtistCreateInput,
  IArtistSearch
> {
  protected toSearchModel(model: Artist): IArtistSearch {
    return {
      name: model.name,
    };
  }
}

export const artistController = new ArtistController(
  artistRepository,
  "ArtistController",
  artistSearchRepository,
  ElasticSearchQueuesLoader.artistQueue,
);
