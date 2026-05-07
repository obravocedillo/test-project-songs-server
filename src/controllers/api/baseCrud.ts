import { NextFunction } from "express";
import { BaseRepository } from "../../repositories/prisma/base";
import { BaseController } from "../base";
import { ITypedRequest } from "../../types/reques";
import { ITypedResponse } from "../../types/response";
import {
  BAD_REQUEST_CODE,
  ERROR_CODE,
  SUCCESS_CODE,
} from "../../constants/responseCodes";
import { BaseSearchRepository } from "../../repositories/elasticSearch/base";

export abstract class BaseCrudController<
  TModel extends { id: number },
  TCreateInput,
  TSearchModel = any,
> extends BaseController {
  protected prismaModel: BaseRepository<TModel, TCreateInput>;
  protected searchModel?: BaseSearchRepository<TSearchModel>;
  protected toSearchModel?(model: TModel): TSearchModel;

  constructor(
    prismaModel: BaseRepository<TModel, TCreateInput>,
    controllerName: string,
    searchModel?: BaseSearchRepository<TSearchModel>,
  ) {
    super(controllerName);
    this.prismaModel = prismaModel;

    if (searchModel) {
      this.searchModel = searchModel;
    }
  }

  async getAll(
    req: ITypedRequest,
    res: ITypedResponse<TModel[]>,
  ): Promise<ITypedResponse<TModel[]>> {
    const records = await this.prismaModel.find();

    return res.status(SUCCESS_CODE).json({ success: true, data: records });
  }

  async getById(
    req: ITypedRequest<{ id: string }, null, { id: string }>,
    res: ITypedResponse<TModel | null>,
  ): Promise<ITypedResponse<TModel | null>> {
    const { id } = req.params;

    const getResult = await this.prismaModel.findById(id);

    return res.status(SUCCESS_CODE).send({ success: true, data: getResult });
  }

  async save(
    req: ITypedRequest<{ objectInformation: TCreateInput }>,
    res: ITypedResponse<TModel | null>,
  ): Promise<ITypedResponse<TModel | null>> {
    const { objectInformation } = req.body;

    const getResult = await this.prismaModel.create(objectInformation);

    if (this.searchModel && this.toSearchModel) {
      try {
        const searchDocument = this.toSearchModel(getResult);
        await this.searchModel.create(String(getResult.id), searchDocument);
      } catch (error) {
        this.controllerLogger.error("ES sync failed", {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return res.status(SUCCESS_CODE).send({ success: true, data: getResult });
  }

  async updateOne(
    req: ITypedRequest<{ objectId: string; objectInformation: TCreateInput }>,
    res: ITypedResponse<TModel | null>,
  ): Promise<ITypedResponse<TModel | null>> {
    const { objectId, objectInformation } = req.body;

    const getResult = await this.prismaModel.update(
      { id: objectId },
      objectInformation,
    );

    if (this.searchModel && this.toSearchModel) {
      try {
        const searchDocument = this.toSearchModel(getResult);
        await this.searchModel.update(String(getResult.id), searchDocument);
      } catch (error) {
        this.controllerLogger.error("ES sync failed", {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return res.status(SUCCESS_CODE).send({ success: true, data: getResult });
  }

  async deleteOne(
    req: ITypedRequest<null, null, { id: string }>,
    res: ITypedResponse<string>,
  ): Promise<ITypedResponse<string>> {
    const { id } = req.params;

    if (!id) {
      return res
        .status(BAD_REQUEST_CODE)
        .send({ success: false, error: "Invalid ID" });
    }

    await this.prismaModel.delete({ id: parseInt(id) });

    if (this.searchModel && this.toSearchModel) {
      try {
        await this.searchModel.delete(String(id));
      } catch (error) {
        this.controllerLogger.error("ES sync failed", {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return res.status(SUCCESS_CODE).send({ success: true, data: "Success" });
  }

  protected async run(
    req: ITypedRequest,
    res: ITypedResponse,
    _next: NextFunction,
  ): Promise<void> {
    const {
      method,
      params: { id },
    } = req;

    if (method === "GET" && id) {
      await this.getById(req, res);
      return;
    }

    if (method === "GET" && !id) {
      await this.getAll(req, res);
      return;
    }

    if (method === "POST") {
      await this.save(req, res);
      return;
    }

    if (method === "PUT") {
      await this.updateOne(req, res);
      return;
    }

    if (method === "DELETE" && id) {
      await this.deleteOne(req, res);
      return;
    }

    res.status(ERROR_CODE).send({ success: false, error: "Invalid request" });
  }
}
