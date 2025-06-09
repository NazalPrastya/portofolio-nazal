import { imageSchema } from "~/schemas/image";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";
import { SUPABASE_BUCKET } from "~/lib/supabase/bucket";
import { supabaseAdminClient } from "~/lib/supabase/server";

export const experienceRouter = createTRPCRouter({
  getList: privateProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.$queryRaw`SELECT * FROM "Experience"`;
    return result;
  }),

  create: privateProcedure
    .input(
      z.object({
        company: z.string({ message: "Company name required" }),
        logo: imageSchema,
        desc: z.string({ message: "Description required" }),
        position: z.string({ message: "Position required" }),
        dateStart: z.string({ message: "Start date required" }).date(),
        dateEnd: z.date().optional(),
        now: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let logoUrl: string | null = null;
      if (input.logo) {
        const { name, type, base64 } = input.logo;
        const buffer = Buffer.from(base64, "base64");
        const fileExt = name.split(".").pop();

        const fileName = `${fileExt}`;
        const { error } = await supabaseAdminClient.storage
          .from(SUPABASE_BUCKET.ExperienceImage)
          .upload(fileName, buffer, {
            contentType: type,
            upsert: true,
          });

        if (error) {
          throw new Error(`Failed to upload image: ${error.message}`);
        }

        const { data } = supabaseAdminClient.storage
          .from(SUPABASE_BUCKET.ExperienceImage)
          .getPublicUrl(fileName);

        logoUrl = data.publicUrl;
      }
      return ctx.db.experience.create({
        data: {
          company: input.company,
          logo: logoUrl,
          desc: input.desc ?? "",
          position: input.position,
          dateStart: input.dateStart,
          dateEnd: input.dateEnd,
          now: input.now,
        },
      });
    }),
});
