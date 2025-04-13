import { imageSchema } from "~/schemas/image";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";

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
      return ctx.db.experience.create({
        data: {
          company: input.company,
          logo: input.logo,
          desc: input.desc ?? "",
          position: input.position,
          dateStart: input.dateStart,
          dateEnd: input.dateEnd,
          now: input.now,
        },
      });
    }),
});
