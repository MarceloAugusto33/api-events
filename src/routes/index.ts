import { Router } from "express";
import { userRouter } from "./user.routes";
import { sessionRouter } from "./session.routes";

export const router = Router();

router.use('/user', userRouter);
router.use('/session', sessionRouter);