import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { authMiddleware } from "../middlewares/authMiddleware";


export const eventRouter = Router();
const eventController = new EventController();

eventRouter.post('/', authMiddleware,eventController.create);
