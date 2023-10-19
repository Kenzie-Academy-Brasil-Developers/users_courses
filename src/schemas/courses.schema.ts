import {z} from 'zod'

export const coursesSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(15),
    description: z.string()
})
export const  courseCreateSchema = coursesSchema.omit({
    id: true
})
export const courseReturnSchema = coursesSchema