import { imageSchema } from "~/schemas/image";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";
import { SUPABASE_BUCKET } from "~/lib/supabase/bucket";
import { supabaseAdminClient } from "~/lib/supabase/server";

export const experienceRouter = createTRPCRouter({
  getList: privateProcedure.query(async ({ ctx }) => {
    return await ctx.db.experience.findMany({
      orderBy: {
        dateStart: "desc",
      },
    });
  }),

  create: privateProcedure
    .input(
      z.object({
        company: z.string({ message: "Company name required" }),
        logo: imageSchema,
        desc: z.string({ message: "Description required" }),
        position: z.string({ message: "Position required" }),
        dateStart: z.string({ message: "Start date required" }),
        dateEnd: z.string().optional(),
        now: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let logoUrl: string | null = null;
      if (input.logo) {
        const { name, type, base64 } = input.logo;
        const buffer = Buffer.from(base64, "base64");
        const fileExt = name.split(".").pop();
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error } = await supabaseAdminClient.storage
          .from(SUPABASE_BUCKET.ExperienceImage)
          .upload(uniqueName, buffer, {
            contentType: type,
            upsert: false,
          });

        if (error) {
          throw new Error(`Failed to upload image: ${error.message}`);
        }

        const { data } = supabaseAdminClient.storage
          .from(SUPABASE_BUCKET.ExperienceImage)
          .getPublicUrl(uniqueName);

        logoUrl = data.publicUrl;
      }

      try {
        return await ctx.db.experience.create({
          data: {
            company: { en: input.company, id: input.company },
            logo: logoUrl,
            desc: { en: input.desc, id: input.desc },
            position: input.position,
            dateStart: new Date(input.dateStart),
            dateEnd: input.dateEnd ? new Date(input.dateEnd) : null,
            now: input.now,
          },
        });
      } catch (error) {
        console.error("Error creating experience:", error);
        throw new Error(
          `Failed to create experience: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }),

  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        company: z.string({ message: "Company name required" }),
        logo: imageSchema,
        desc: z.string({ message: "Description required" }),
        position: z.string({ message: "Position required" }),
        dateStart: z.string({ message: "Start date required" }),
        dateEnd: z.string().optional(),
        now: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let logoUrl: string | undefined = undefined;
      if (input.logo) {
        const { name, type, base64 } = input.logo;
        const buffer = Buffer.from(base64, "base64");
        const fileExt = name.split(".").pop();
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error } = await supabaseAdminClient.storage
          .from(SUPABASE_BUCKET.ExperienceImage)
          .upload(uniqueName, buffer, {
            contentType: type,
            upsert: false,
          });

        if (error) {
          throw new Error(`Failed to upload image: ${error.message}`);
        }

        const { data } = supabaseAdminClient.storage
          .from(SUPABASE_BUCKET.ExperienceImage)
          .getPublicUrl(uniqueName);

        logoUrl = data.publicUrl;
      }

      try {
        return await ctx.db.experience.update({
          where: { id: input.id },
          data: {
            company: { en: input.company, id: input.company },
            logo: logoUrl,
            desc: { en: input.desc, id: input.desc },
            position: input.position,
            dateStart: new Date(input.dateStart),
            dateEnd: input.dateEnd ? new Date(input.dateEnd) : null,
            now: input.now,
          },
        });
      } catch (error) {
        console.error("Error updating experience:", error);
        throw new Error(
          `Failed to update experience: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.experience.delete({
        where: { id: input.id },
      });
    }),
});
