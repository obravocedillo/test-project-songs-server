import { BaseSearchRepository } from "./base";

interface IGenreSearchRepository {
  title: string;
  artistId: number;
  genreId: number;
}

class ArtistSearchRepository extends BaseSearchRepository<IGenreSearchRepository> {
  constructor() {
    super("artist", {
      properties: {
        name: { type: "text" },
      },
    });
  }
}

export const artistSearchRepository = new ArtistSearchRepository();
