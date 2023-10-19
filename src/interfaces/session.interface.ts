import { z } from "zod"
import { QueryResult } from "pg"
import { sessionSchema } from "../schemas/session.schema"

export type SessionRequest = z.infer<typeof sessionSchema>
export type SessionResult = QueryResult<SessionRequest>