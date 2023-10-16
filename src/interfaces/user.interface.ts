import { z } from "zod"
import { userCreateSchema, userReturnSchema, userSchema } from "../schemas/user.schema"
import { QueryResult } from "pg"

export type User = z.infer<typeof userSchema>
export type UserCreate = z.infer<typeof userCreateSchema>
export type UserReturn = z.infer<typeof userReturnSchema>
export type UserResult = QueryResult<User>