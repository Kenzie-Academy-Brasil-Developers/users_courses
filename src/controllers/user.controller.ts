import { Request, Response } from "express";
import { UserReturn } from "../interfaces/user.interface";
import { createUserService } from "../services/user.services";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await createUserService(req.body)
    
    return res.status(201).json(user)
}