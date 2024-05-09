import { Router } from "express";
import { SessionController } from "../controllers/SessionController";

export const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post('/', sessionController.create);