import {z} from 'zod';
import { emailSchema, passwordSchema } from '~/schemas/auth';

export const loginFormSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;