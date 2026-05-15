import { BaseSearchRepository } from "./base";

export interface IGenreSearch {
  name: string;
}

class GenreSearchRepository extends BaseSearchRepository<IGenreSearch> {
  constructor() {
    super("genre", {
      properties: {
        name: { type: "text" },
      },
    });
  }
}

export const genreSearchRepository = new GenreSearchRepository();
