import { z } from "zod";
import { emailSchema } from "~/schemas/auth";

export const inboxFormSchema = z.object({
  name: z.string({ message: "Name required" }).min(1).max(100),
  email: emailSchema,
  message: z.string().min(1).max(3000),
});

export type InboxFormSchema = z.infer<typeof inboxFormSchema>;
