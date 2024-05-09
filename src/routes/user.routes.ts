import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const userRouter = Router()
const userController = new UserController()

userRouter.post('/', userController.create);
userRouter.get('/', authMiddleware,userController.read);
userRouter.put('/', authMiddleware,userController.update);
userRouter.delete('/', authMiddleware,userController.delete);

