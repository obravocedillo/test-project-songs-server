import { Artist, Prisma } from "../../generated/prisma/client";
import { BaseRepository } from "./base";

class ArtistRepository extends BaseRepository<
  Artist,
  Prisma.ArtistCreateInput
> {
  constructor() {
    super(Prisma.ModelName.Artist);
  }
}

export const artistRepository = new ArtistRepository();
