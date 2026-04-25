import { Prisma } from "../generated/prisma/client";
import { PrismaLoader } from "../loaders/prisma";

interface IBaseRepository<T, TCreateInput> {
  findById(id: string): Promise<T>;
  find(where?: Record<string, any>): Promise<T[]>;
  create(data: TCreateInput): Promise<T>;
  createMany(data: TCreateInput[]): Promise<T[]>;
  update(where: Record<string, any>, data: Partial<TCreateInput>): Promise<T>;
  updateMany(
    where: Record<string, any>,
    data: Partial<TCreateInput>,
  ): Promise<T>;
  delete(where: Record<string, any>): Promise<void>;
  deleteMany(where: Record<string, any>): Promise<void>;
}

export class BaseRepository<TModel, TCreateInput> implements IBaseRepository<
  TModel,
  TCreateInput
> {
  prismaModel: any;

  constructor(modelName: Prisma.ModelName) {
    this.prismaModel = PrismaLoader.prisma[
      (modelName as string).toLowerCase() as keyof typeof PrismaLoader.prisma
    ] as TModel;
  }

  findById(id: string) {
    return this.prismaModel.findUnique({ where: { id } });
  }

  find(where?: Record<string, any>): Promise<TModel[]> {
    return this.prismaModel.findMany({ where });
  }

  create(data: TCreateInput): Promise<TModel> {
    return this.prismaModel.create({ data });
  }

  createMany(data: TCreateInput[]): Promise<TModel[]> {
    return this.prismaModel.createMany({ data, skipDuplicates: true });
  }

  update(
    where: Record<string, any>,
    data: Partial<TCreateInput>,
  ): Promise<TModel> {
    return this.prismaModel.update({ where, data });
  }

  updateMany(
    where: Record<string, any>,
    data: Partial<TCreateInput>,
  ): Promise<TModel> {
    return this.prismaModel.updateMany({ where, data });
  }

  delete(where: Record<string, any>): Promise<void> {
    return this.prismaModel.delete({ where });
  }

  deleteMany(where: Record<string, any>): Promise<void> {
    return this.prismaModel.deleteMany({ where });
  }
}
