import { Express } from "express";
import { PrismaLoader } from "./prisma";
import { ElasticSearchLoader } from "./elasticSearch";
import { ElasticSearchQueuesLoader } from "./elasticSearchQueues";
import { QueuesLoader } from "./queue";

export class Loader {
  async execute(app: Express): Promise<void> {
    const prismaLoader = new PrismaLoader();
    await prismaLoader.execute();

    const elasticSearchLoader = new ElasticSearchLoader();
    await elasticSearchLoader.execute();

    const queuesLoader = new QueuesLoader();
    await queuesLoader.execute();

    const elasticSearchQueuesLoader = new ElasticSearchQueuesLoader();
    await elasticSearchQueuesLoader.execute();

    // Avoid intialization of express until loaders are done
    const { ExpressLoader } = await import("./express").catch((e) => {
      throw new Error(`Failed to import ExpressLoader: ${e}`);
    });
    const expressLoader = new ExpressLoader();

    await expressLoader.execute(app);
  }
}
