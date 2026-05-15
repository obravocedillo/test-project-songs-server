import { Song } from "../../generated/prisma/client";
import { SongCreateInput } from "../../generated/prisma/models";
import {
  ISongsSearch,
  songsSearchRepository,
} from "../../repositories/elasticSearch/songs";
import { songRepository } from "../../repositories/prisma/songs";
import { BaseCrudController } from "./baseCrud";

class SongsController extends BaseCrudController<
  Song,
  SongCreateInput,
  ISongsSearch
> {
  protected toSearchModel(model: Song): ISongsSearch {
    return {
      title: model.title,
      genreId: model.genreId,
      artistId: model.artistId,
    };
  }
}

export const songsController = new SongsController(
  songRepository,
  "SongsController",
  songsSearchRepository,
);
