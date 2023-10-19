import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/App.error"

export const verifyCourse = (req: Request, res: Response, next: NextFunction): void => {
   const user = req.body
   const userInCourse = user

   if(!userInCourse) {
    throw new AppError("No course found")
   }
   return next()
}