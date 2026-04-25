import { Router } from "express";

import { songsController } from "../../controllers/api/songs";

export const songsRouter = Router();

songsRouter.get("/:id", songsController.execute.bind(songsController));
songsRouter.get("/", songsController.execute.bind(songsController));
songsRouter.post("/", songsController.execute.bind(songsController));
songsRouter.put("/", songsController.execute.bind(songsController));
songsRouter.delete("/", songsController.execute.bind(songsController));
