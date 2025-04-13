import {z} from 'zod';

export const createExperienceFormSchema = z.object({
    company: z.string({message: "Email Required"}),
});

export type CreateExperienceFormSchema = z.infer<typeof createExperienceFormSchema>;