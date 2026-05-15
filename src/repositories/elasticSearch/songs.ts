import { BaseSearchRepository } from "./base";

export interface ISongsSearch {
  title: string;
  artistId: number | null;
  genreId: number | null;
}

class SongsSearchRepository extends BaseSearchRepository<ISongsSearch> {
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
