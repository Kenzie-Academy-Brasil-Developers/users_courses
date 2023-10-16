import { hash } from "bcryptjs";
import { UserCreate, UserReturn } from "../interfaces/user.interface";
import format from "pg-format";
import { UserResult } from "../interfaces/courses.interface";
import { client } from "../database";
import { userReturnSchema } from "../schemas/user.schema";


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