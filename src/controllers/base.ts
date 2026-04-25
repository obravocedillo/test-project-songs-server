import { NextFunction, Request, Response } from "express";
import { IBaseLogger } from "../services/logger/base";
import { baseLogger } from "../services/logger/factory";

export abstract class BaseController {
  protected controllerName: string;
  protected controllerLogger: IBaseLogger;

  constructor(controllerName: string) {
    this.controllerName = controllerName;
    this.controllerLogger = baseLogger.createChildLogger("Controller");
  }

  protected abstract run(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  async execute(req: Request, res: Response, next: NextFunction) {
    const { query, params, body, method, url } = req;

    this.controllerLogger.info(`
      Executing controller: ${this.controllerName}
      Method: ${method}
      url: ${url}
      query: ${JSON.stringify(query)}
      params: ${JSON.stringify(params)}
      body: ${JSON.stringify(body)}
    `);

    await this.run(req, res, next);
  }
}
