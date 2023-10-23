import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors/App.error";

export const verifyInCourse = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const courseId = req.params.courseId
    const queryString = `SELECT FROM "courses" WHERE id = $1;`

    const queryResult = await client.query(queryString, [courseId])

    if(!queryResult.rowCount){
        throw new AppError("User/course not found",404)
    }
    return next()
}