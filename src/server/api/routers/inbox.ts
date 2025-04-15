import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import axios from "axios";

const phoneNumber = process.env.PHONE_NUMBER;
export const inboxRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        message: z.string().min(1).max(3000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const inboxEntry = await ctx.db.inbox.create({
        data: {
          name: input.name,
          email: input.email,
          message: input.message,
        },
      });

      console.log("inbox", inboxEntry);
      try {
        const response = await axios.post(
          "https://api.fonnte.com/send",
          {
            target: phoneNumber,
            message: `BANGUNNNNNN!!!!
Ada pesan dari Weblu zal
Email: ${input.email}
Pesan :${input.message}`,
          },
          {
            headers: {
              Authorization: process.env.FONNTE_TOKEN || "",
            },
          },
        );
        console.log("resWa", response);
        return {
          success: true,
          inboxEntry,
          whatsappResponse: response.data,
        };
      } catch (error) {
        console.error("Error sending WhatsApp message:", error);
        return {
          success: false,
          inboxEntry,
          error: "Failed to send WhatsApp message",
        };
      }
    }),
});
