import { BaseSearchRepository } from "./base";

interface IGenreSearchRepository {
  title: string;
  artistId: number;
  genreId: number;
}

class GenreSearchRepository extends BaseSearchRepository<IGenreSearchRepository> {
  constructor() {
    super("genre", {
      properties: {
        name: { type: "text" },
      },
    });
  }
}

export const genreSearchRepository = new GenreSearchRepository();
