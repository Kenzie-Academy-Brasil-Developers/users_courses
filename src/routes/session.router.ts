import { Router } from "express";
import { sessionController } from "../controllers/session.controller";
import { validateBody } from "../middlewares/validadeBody.middleware";
import { sessionSchema } from "../schemas/session.schema";

export const sessionRouter: Router = Router()

sessionRouter.post('/',validateBody(sessionSchema), sessionController)