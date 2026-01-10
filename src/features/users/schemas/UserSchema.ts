// libraries
import {z} from "zod"

export const userSchema = z.object({
    firstName: z.string().min(1, 'Имя слишком короткое'),
    lastName: z.string().min(1, 'Фамилия слишком короткая'),
    email: z.email('Неправильный адрес электронной почты'),
    skills: z.array(
        z.object({
            value: z.string().min(1,
                'Навык не может быть пустым')
        })
    ).min(1, 'Добавьте как минимум один навык'),
})

export type UserFormData =  z.infer<typeof userSchema>