import {z} from 'zod'
import { userCourseCreateSchema, userCoursesSchema } from '../schemas/userCourses.schema'
import { userReturnSchema } from '../schemas/user.schema'
import { QueryResult } from 'pg'

export type UserCourse = z.infer<typeof userCoursesSchema>
export type UserCourseCreate = z.infer<typeof userCourseCreateSchema>
export type UserCourseResult = QueryResult<UserCourse>