import {z} from 'zod'

export const emailSchema = z.string({message: "Email Required"}).email({message: "Email not valid"})
export const passwordSchema = z
  .string({message: "Password Required"})
  .min(6, "Password not valid")
  .regex(/[A-Z]/, "Password not valid")
  .regex(/[0-9]/, "Password not valid");