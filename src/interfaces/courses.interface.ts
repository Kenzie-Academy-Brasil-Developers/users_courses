import {z} from 'zod'
import { courseCreateSchema, coursesSchema } from '../schemas/courses.schema'
import { QueryResult } from 'pg'


export type Course = z.infer<typeof coursesSchema>
export type UserCreate = z.infer<typeof courseCreateSchema>
export type UserResult = QueryResult<Course>