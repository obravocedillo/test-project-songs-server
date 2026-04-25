import { Router } from "express";

import { artistController } from "../../controllers/api/artist";

export const artistRouter = Router();

artistRouter.get("/:id", artistController.execute.bind(artistController));
artistRouter.get("/", artistController.execute.bind(artistController));
artistRouter.post("/", artistController.execute.bind(artistController));
artistRouter.put("/", artistController.execute.bind(artistController));
artistRouter.delete("/", artistController.execute.bind(artistController));
