import { Prisma, Song } from "../../generated/prisma/client";
import { BaseRepository } from "./base";

class SongRepository extends BaseRepository<Song, Prisma.SongCreateInput> {
  constructor() {
    super(Prisma.ModelName.Song);
  }
}

export const songRepository = new SongRepository();
