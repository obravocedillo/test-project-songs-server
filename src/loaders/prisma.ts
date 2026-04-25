import { BaseLoader } from "./base";
import { prismaConfiguration } from "../config/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const { DATABASE_URL } = prismaConfiguration;

export class PrismaLoader extends BaseLoader {
  static prisma: PrismaClient;

  constructor() {
    super("PrismaLoader");
  }

  protected async load(): Promise<any> {
    const adapter = new PrismaPg({ connectionString: DATABASE_URL });
    const prisma = new PrismaClient({ adapter });

    PrismaLoader.prisma = prisma;

    return prisma;
  }
}
