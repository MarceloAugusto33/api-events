import { Router } from "express";
import { UserController } from "../controllers/UserController";

export const userRouter = Router()
const userController = new UserController()

userRouter.post('/', userController.create);
userRouter.get('/:id', userController.read);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

