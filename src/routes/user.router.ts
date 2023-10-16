import { Router } from "express";
import { createUserController } from "../controllers/user.controller";
import { validateBody } from "../middlewares/validadeBody.middleware";
import { userCreateSchema } from "../schemas/user.schema";

export const userRouter: Router = Router()

userRouter.post('/',validateBody(userCreateSchema), createUserController)