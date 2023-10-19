import { compare } from "bcryptjs"
import { client } from "../database"
import { AppError } from "../errors/App.error"
import { SessionRequest } from "../interfaces/session.interface"
import { User, UserResult } from "../interfaces/user.interface"
import { sign } from "jsonwebtoken"


export const loginService = async (data: SessionRequest): Promise<{token: string}> => {
    const queyrString: string = `
    SELECT * FROM "users" WHERE "email" = $1;
    `
   
    const queryResult: UserResult = await client.query(queyrString, [data.email])

    if(!queryResult.rowCount) {
        throw new AppError("Wrong email/password", 401)
    }
    const user: User = queryResult.rows[0]
    const passMatch = await compare(data.password, user.password)

    if(!passMatch) {
        throw new AppError("Wrong email/password", 401)
    }
    
    const token: string = sign(
        { email: user.email, admin: user.admin }, 
        process.env.SECRET_KEY!, 
        { expiresIn: process.env.EXPIRES_IN!, subject: user.id.toString() }
      )
      return {token}
    }