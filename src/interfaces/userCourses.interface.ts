import {z} from 'zod'
import { userCourseCreateSchema, userCoursesSchema } from '../schemas/userCourses.schema'
import { userReturnSchema } from '../schemas/user.schema'
import { QueryResult } from 'pg'

export type UserCourse = z.infer<typeof userCoursesSchema>
export type UserCreate = z.infer<typeof userCourseCreateSchema>
export type UseReturn = z.infer<typeof userReturnSchema>
export type UserResult = QueryResult<UserCourse>