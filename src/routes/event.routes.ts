import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { authMiddleware } from "../middlewares/authMiddleware";


export const eventRouter = Router();
const eventController = new EventController();

eventRouter.post('/', authMiddleware, eventController.create);
eventRouter.get('/:id', eventController.read);
eventRouter.get('/all/:page', eventController.readAll);
eventRouter.put('/:id', authMiddleware, eventController.update);
eventRouter.delete('/:id', authMiddleware, eventController.delete);
