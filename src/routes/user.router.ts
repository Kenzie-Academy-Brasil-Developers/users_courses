import { Router } from "express";
import { createUserController, getUsersController, readCoursesUsersController } from "../controllers/user.controller";
import { validateBody } from "../middlewares/validadeBody.middleware";
import { userCreateSchema } from "../schemas/user.schema";
import { uniqueEmail } from "../middlewares/uniqueEmail.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermissions } from "../middlewares/verifyPermissions.middleware";
import { verifyCourse } from "../middlewares/verifyCourse.middlware";

export const userRouter: Router = Router()

userRouter.post('/',validateBody(userCreateSchema), uniqueEmail, createUserController)
userRouter.get('/:id/courses' ,verifyToken, verifyPermissions,verifyCourse, readCoursesUsersController)
userRouter.get('/' ,verifyToken, verifyPermissions, getUsersController)