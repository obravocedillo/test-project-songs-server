import { BaseSearchRepository } from "./base";

interface ISongsSearchRepository {
  title: string;
  artistId: number;
  genreId: number;
}

class SongsSearchRepository extends BaseSearchRepository<ISongsSearchRepository> {
  constructor() {
    super("song", {
      properties: {
        title: { type: "text" },
        artistId: { type: "integer" },
        genreId: { type: "integer" },
      },
    });
  }
}

export const songsSearchRepository = new SongsSearchRepository();
