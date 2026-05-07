import { Genre } from "../../generated/prisma/client";
import { GenreCreateInput } from "../../generated/prisma/models";
import { genreRepository } from "../../repositories/prisma/genre";
import { BaseCrudController } from "./baseCrud";

class GenreController extends BaseCrudController<Genre, GenreCreateInput> {}

export const genreController = new GenreController(
  genreRepository,
  "GenreController",
);
