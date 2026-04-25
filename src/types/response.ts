import { Response } from "express";

interface ISuccessResponse<T> {
  success: true;
  data: T;
}

interface IErrorResponse {
  success: false;
  error: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ITypedResponse<T = any> extends Response<
  ISuccessResponse<T> | IErrorResponse
> {}
