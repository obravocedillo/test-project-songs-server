import { NextFunction, Request } from "express";
import { baseLogger } from "../services/logger/factory";
import { ERROR_CODE } from "../constants/responseCodes";
import { ITypedResponse } from "../types/response";

const errorLoogger = baseLogger.createChildLogger("GlobalErrorMiddleware");

export const globalErrorMiddleware = (
  error: Error,
  req: Request,
  res: ITypedResponse,
  _next: NextFunction,
) => {
  errorLoogger.error(error.message, { stack: error.stack, error });

  res.status(ERROR_CODE).send({ success: false, error: error.message });
};
