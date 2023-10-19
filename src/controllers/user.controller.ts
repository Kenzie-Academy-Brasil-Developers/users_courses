import { Request, Response } from "express";
import { UserReturn } from "../interfaces/user.interface";
import { createUserService, getUsers, readCoursesUsers } from "../services/user.services";
import { readUsersinCourse } from "../services/courses.services";


export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await createUserService(req.body)
    
    return res.status(201).json(user)
}


export const readCoursesUsersController = async (req: Request, res: Response): Promise<Response> => {
    const courses = await readCoursesUsers(req.params.id)
    return res.status(200).json(courses)
}


export const getUsersController = async (req: Request, res: Response): Promise<Response> => {
    const users = await getUsers()
    return res.status(200).json(users)
}


export const readUsersInCoursesController = async (req: Request, res: Response): Promise<Response> => {
    const usersInCourses = await readUsersinCourse(req.params.id)
    return res.status(200).json(usersInCourses)
}