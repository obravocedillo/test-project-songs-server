import { NextFunction, Request } from "express";

import { BaseController } from "../base";
import { ITypedResponse } from "../../types/response";
import { SUCCESS_CODE } from "../../constants/responseCodes";

export class HealthController extends BaseController {
  constructor() {
    super("Api-HealthController");
  }

  async run(_req: Request, res: ITypedResponse<string>, _next: NextFunction) {
    res.status(SUCCESS_CODE).send({ success: true, data: "Api is healthy!" });
  }
}
export const healthController = new HealthController();
