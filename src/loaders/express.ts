import { globalErrorMiddleware } from "../middlewares/error";
import { apiRouter } from "../routes/api";
import { mainRouter } from "../routes/main";
import { BaseLoader } from "./base";
import { Express, json, urlencoded } from "express";
import cors from "cors";

export class ExpressLoader extends BaseLoader {
  constructor() {
    super("ExpressLoader");
  }

  protected async load(app: Express): Promise<void> {
    app.use(cors());
    app.use(urlencoded({ extended: true }));
    app.use(json({ limit: "10mb" }));

    app.use("/", mainRouter);
    app.use("/api", apiRouter);

    app.use(globalErrorMiddleware);
  }
}
