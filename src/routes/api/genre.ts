import { Router } from "express";

import { genreController } from "../../controllers/api/genre";

export const genreRouter = Router();

genreRouter.get("/:id", genreController.execute.bind(genreController));
genreRouter.get("/", genreController.execute.bind(genreController));
genreRouter.post("/", genreController.execute.bind(genreController));
genreRouter.put("/", genreController.execute.bind(genreController));
genreRouter.delete("/", genreController.execute.bind(genreController));
