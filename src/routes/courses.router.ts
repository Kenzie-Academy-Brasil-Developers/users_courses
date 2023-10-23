import { Router } from "express";
import { createCourseController, deleteUserCourseController, getCourseController, userIncourseController } from "../controllers/courses.controller";
import { verifyPermissions } from "../middlewares/verifyPermissions.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateBody } from "../middlewares/validadeBody.middleware";
import { courseCreateSchema } from "../schemas/courses.schema";
import { readUsersInCoursesController } from "../controllers/user.controller";
import { verifyInCourse } from "../middlewares/verifyUserCourse.middleware";
import { verifyUser } from "../middlewares/verifyUser.middleware";



export const coursesRouter: Router = Router()

coursesRouter.post('/', verifyToken, verifyPermissions, validateBody(courseCreateSchema), createCourseController)

coursesRouter.get('/', getCourseController)

coursesRouter.post('/:courseId/users/:userId', verifyToken, userIncourseController)

coursesRouter.get('/:id/users',verifyToken, verifyPermissions, readUsersInCoursesController)

coursesRouter.delete('/:courseId/users/:userId', verifyToken,  verifyPermissions, verifyInCourse, verifyUser,  deleteUserCourseController)