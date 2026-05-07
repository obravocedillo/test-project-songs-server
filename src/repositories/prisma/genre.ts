import { Genre, Prisma } from "../../generated/prisma/client";
import { BaseRepository } from "./base";

class GenreRepository extends BaseRepository<Genre, Prisma.GenreCreateInput> {
  constructor() {
    super(Prisma.ModelName.Genre);
  }
}

export const genreRepository = new GenreRepository();
