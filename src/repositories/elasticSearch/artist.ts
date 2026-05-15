import { BaseSearchRepository } from "./base";

export interface IArtistSearch {
  name: string;
}

class ArtistSearchRepository extends BaseSearchRepository<IArtistSearch> {
  constructor() {
    super("artist", {
      properties: {
        name: { type: "text" },
      },
    });
  }
}

export const artistSearchRepository = new ArtistSearchRepository();
