import { Request, Response } from "express";
import { createCourseService, deleteUserCurse, getCourses, userIncourse } from "../services/courses.services";

export const  createCourseController = async (req: Request, res: Response) => {
  const course = await createCourseService(req.body)
  return res.status(201).json(course)
};

export const getCourseController = async (req: Request, res: Response): Promise<Response> => {
  const courses = await getCourses()
  return res.status(200).json(courses)
}

export const userIncourseController = async (req: Request, res: Response): Promise<Response> => {
  const courses = await userIncourse(req.params.courseId, req.params.userId)
  return res.status(201).json(courses)
}


export const deleteUserCourseController = async (req: Request, res: Response): Promise<Response> => {
  const developer = await deleteUserCurse(req.params.courseId, req.params.userId)
  return res.status(200).json(developer)
}   