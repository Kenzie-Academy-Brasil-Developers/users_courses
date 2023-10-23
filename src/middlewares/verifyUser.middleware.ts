import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/App.error"
import { client } from "../database"

export const verifyUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.courseId
    const queryString = `SELECT FROM "users" WHERE id = $1;`

    const queryResult = await client.query(queryString, [userId])

    if(!queryResult.rowCount){
        throw new AppError("User/course not found",404)
    }
    return next()
}