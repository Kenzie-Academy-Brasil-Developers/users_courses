import format from "pg-format"
import { client } from "../database"
import { courseReturnSchema } from "../schemas/courses.schema"
import { UserCreate } from "../interfaces/user.interface"
import { QueryResult } from "pg"
import { Course } from "../interfaces/courses.interface"
import { UserCourseResult } from "../interfaces/userCourses.interface"
import { AppError } from "../errors/App.error"

export const createCourseService = async (data: UserCreate ) => {

    const queryFormat: string = format(`
    INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
    )
    const queryResult = await client.query(queryFormat)

    return courseReturnSchema.parse(queryResult.rows[0])
}


export const getCourses = async () => {
    const queryString: string = `
    SELECT "id","name","description" FROM "courses";
    `
    const queryResult: QueryResult<Course> = await client.query(queryString)
    return queryResult.rows
}


export const userIncourse = async (courseId: string, userId: string) => {
    const queryString: string = format(`
    INSERT INTO "userCourses" ("courseId","userId")
    VALUES ($1,$2) RETURNING *;
    `)
    const queryResult = await client.query(queryString, [courseId, userId])
    return queryResult.rows
}

export const readUsersinCourse = async (courseId: string) => {
    const queryString: string = `
    SELECT 
    "userCourses"."userId",
    "userCourses"."courseId",
    "userCourses".active AS "userActiveInCourse",
    users.name AS "userName",
    courses.name AS "courseName",
    courses.description AS "courseDescription" 
    FROM "userCourses"
    JOIN users ON users.id = "userCourses"."userId" 
    JOIN courses ON courses.id = "userCourses"."courseId" 
    WHERE "userCourses"."courseId" = $1;
    `
    const queryResult: UserCourseResult = await client.query(queryString, [courseId])

    return queryResult.rows
}
export const deleteUserCurse = async (courseId: string, userId: string) => {
    const queryString: string = `
    UPDATE "userCourses"
    SET "active" = false
    WHERE "id" = $1;
    `
    await client.query(queryString, [courseId, userId])
}