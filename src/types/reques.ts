import { Request } from "express";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ITypedRequest<T = any, U = any, V = any> extends Request<
  V,
  null,
  T,
  U
> {}
