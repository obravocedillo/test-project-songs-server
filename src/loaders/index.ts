import { Express } from "express";
import { PrismaLoader } from "./prisma";

export class Loader {
  async execute(app: Express): Promise<void> {
    const prismaLoader = new PrismaLoader();
    await prismaLoader.execute();

    // Put below other loaders to avoid loading models before initialization
    const { ExpressLoader } = await import("./express").catch((e) => {
      throw new Error(`Failed to import ExpressLoader: ${e}`);
    });
    const expressLoader = new ExpressLoader();

    await expressLoader.execute(app);
  }
}
