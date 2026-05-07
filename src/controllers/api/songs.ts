import { Song } from "../../generated/prisma/client";
import { SongCreateInput } from "../../generated/prisma/models";
import { songRepository } from "../../repositories/prisma/songs";
import { BaseCrudController } from "./baseCrud";

class SongsController extends BaseCrudController<Song, SongCreateInput> {}

export const songsController = new SongsController(
  songRepository,
  "SongsController",
);
