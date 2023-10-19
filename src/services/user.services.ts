import { hash } from "bcryptjs";
import { User, UserCreate, UserReturn } from "../interfaces/user.interface";
import format from "pg-format";
import { UserResult } from "../interfaces/courses.interface";
import { client } from "../database";
import { userReturnSchema } from "../schemas/user.schema";
import { AppError } from "../errors/App.error";
import { QueryResult } from "pg";


export const createUserService = async (data: UserCreate): Promise<UserReturn> => {
    data.password = await hash(data.password, 10)

    const queryFormat: string = format(`
    INSERT INTO "users" (%I) VALUES (%L) RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
    )
    const queryResult: UserResult = await client.query(queryFormat)

    return userReturnSchema.parse(queryResult.rows[0])
}


export const getUsers = async () => {
  const queryString: string = `
  SELECT "id","name","email","admin" FROM "users";
  `
  const queryResult: QueryResult<User> = await client.query(queryString)
  return queryResult.rows
}


export const readCoursesUsers = async (userId: string) => {
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
  WHERE "userCourses"."userId" = $1;
  `
  const queryResult: UserResult = await client.query(queryString, [userId])
  console.log(queryResult.rows)
  if(!queryResult.rowCount) {
    throw new AppError('No courses linked to this user',404)
  }
  return queryResult.rows
}