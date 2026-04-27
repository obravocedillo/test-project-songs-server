import { Router } from "express";
import { healthController } from "../../controllers/api/health";
import { songsRouter } from "./songs";
import { genreRouter } from "./genre";
import { artistRouter } from "./artist";

export const apiRouter = Router();

apiRouter.get("/health", healthController.execute.bind(healthController));

apiRouter.use("/songs", songsRouter);
apiRouter.use("/artist", artistRouter);
apiRouter.use("/genre", genreRouter);
