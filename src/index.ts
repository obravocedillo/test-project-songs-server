import "dotenv/config";
import express from "express";
import { Loader } from "./loaders";
import { baseLogger } from "./services/logger/factory";

const app = express();

const startApp = async () => {
  baseLogger.info(`Initializing server`);

  const loader = new Loader();
  await loader.execute(app);

  const port = 3002;

  app.listen(port, () => {
    baseLogger.info(`Server running on http://localhost:${port}`);
  });
};

startApp().then(() => {});
