export interface IPrismaConfig {
  DATABASE_URL: string;
}

export const prismaConfiguration: IPrismaConfig = {
  DATABASE_URL: process.env.DATABASE_URL ?? "",
};
