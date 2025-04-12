import { z } from "zod";
import { supabase } from "~/lib/supabase/client";
import { passwordSchema } from "~/schemas/auth";


import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
    login: publicProcedure
      .input(z.object({
        email: z.string().email().toLowerCase(),
        password: passwordSchema,
      }))
      .mutation(async ({ input }) => {
        const { email, password } = input;
  
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
  
        if (error) {
          throw new Error(error.message);
        }
  
        return {
          user: data.user,
          session: data.session,
        };
      }),
  });