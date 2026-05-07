import { Artist } from "../../generated/prisma/client";
import { ArtistCreateInput } from "../../generated/prisma/models";
import { artistRepository } from "../../repositories/prisma/artist";
import { BaseCrudController } from "./baseCrud";

class ArtistController extends BaseCrudController<Artist, ArtistCreateInput> {}

export const artistController = new ArtistController(
  artistRepository,
  "ArtistController",
);
