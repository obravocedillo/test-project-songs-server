import { NextFunction } from "express";
import { BaseRepository } from "../../repositories/base";
import { BaseController } from "../base";
import { ITypedRequest } from "../../types/reques";
import { ITypedResponse } from "../../types/response";
import { ERROR_CODE, SUCCESS_CODE } from "../../constants/responseCodes";

export abstract class BaseCrudController<
  TModel,
  TCreateInput,
> extends BaseController {
  protected prismaModel: BaseRepository<TModel, TCreateInput>;

  constructor(
    prismaModel: BaseRepository<TModel, TCreateInput>,
    controllerName: string,
  ) {
    super(controllerName);
    this.prismaModel = prismaModel;
  }

  async getAll(
    req: ITypedRequest,
    res: ITypedResponse<TModel[]>,
  ): Promise<ITypedResponse<TModel[]>> {
    const records = await this.prismaModel.find();

    console.log(records);

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

    return res.status(SUCCESS_CODE).send({ success: true, data: getResult });
  }

  async deleteOne(
    req: ITypedRequest<null, null, { id: string }>,
    res: ITypedResponse<string>,
  ): Promise<ITypedResponse<string>> {
    const { id } = req.params;

    await this.prismaModel.delete({ id });

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
