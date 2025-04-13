import { z } from "zod";
import { imageSchema } from "~/schemas/image";

export const createExperienceFormSchema = z.object({
  company: z.string({ message: "Company name required" }),
  logo: imageSchema,
  desc: z.string({ message: "Description required" }),
  position: z.string({ message: "Position required" }),
  dateStart: z.string({ message: "Start date required" }).date(),
  dateEnd: z.string().date().optional(),
  now: z.boolean(),
});

export type CreateExperienceFormSchema = z.infer<
  typeof createExperienceFormSchema
>;
