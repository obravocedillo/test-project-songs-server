import { Genre } from "../../generated/prisma/client";
import { GenreCreateInput } from "../../generated/prisma/models";
import {
  genreSearchRepository,
  IGenreSearch,
} from "../../repositories/elasticSearch/genre";
import { genreRepository } from "../../repositories/prisma/genre";
import { BaseCrudController } from "./baseCrud";

class GenreController extends BaseCrudController<
  Genre,
  GenreCreateInput,
  IGenreSearch
> {
  protected toSearchModel(model: Genre): IGenreSearch {
    return {
      name: model.name,
    };
  }
}

export const genreController = new GenreController(
  genreRepository,
  "GenreController",
  genreSearchRepository,
);
