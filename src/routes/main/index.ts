import { Router } from "express";
import { healthController } from "../../controllers/main/health";

export const mainRouter = Router();

mainRouter.get("/health", healthController.execute.bind(healthController));
