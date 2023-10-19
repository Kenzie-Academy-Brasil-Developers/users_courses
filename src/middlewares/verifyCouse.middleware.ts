import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors/App.error";

export const verifyInCourse = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const courseid = req.params.courseId
    const userId = req.params.userId
    const queryString = `SELECT FROM "userCourses" WHERE ("courseId", "userId") = ($1, $2);`

    const queryResult = await client.query(queryString, [courseid, userId])

    if(!queryResult.rowCount){
        throw new AppError("User/course not found",404)
    }
    return next()
}