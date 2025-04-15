import { OpenAI } from "openai";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { supabase } from "~/lib/supabase/client";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const chatBotRouter = createTRPCRouter({
  chat: publicProcedure
    .input(z.object({ question: z.string() }))
    .mutation(async ({ input }) => {
      const { question } = input;

      const { data: experiences } = await supabase
        .from("experiences")
        .select("*")
        .or(`role.ilike.%${question}%,company.ilike.%${question}%`)
        .limit(2);

      const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .or(`title.ilike.%${question}%,tech_stack.ilike.%${question}%`)
        .limit(2);

      // 2. Format data untuk prompt
      const experienceText =
        experiences
          ?.map(
            (exp) =>
              `- ${exp.role} di ${exp.company} (${exp.duration}): ${exp.description}`,
          )
          .join("\n") || "Tidak ada data";

      const projectText =
        projects
          ?.map(
            (proj) =>
              `- ${proj.title} (Tech: ${proj.tech_stack}): ${proj.description}`,
          )
          .join("\n") || "Tidak ada data";

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
              Kamu adalah asisten digital Nazal. Jawablah pertanyaan berdasarkan data berikut:

              **Pengalaman**:
              ${experienceText}

              **Project**:
              ${projectText}

              **Rules**:
              - Jika tidak ada data terkait, jawab: "Wah, sepertinya Nazal belum pernah bahas ini. Coba tanya hal lain ya!"
              - Bahasa: Santai, friendly, dan pakai kata ganti "aku/gw".
            `,
          },
          { role: "user", content: question },
        ],
      });

      const replyContent =
        response.choices[0]?.message?.content ||
        "Maaf, terjadi kesalahan dalam memproses pertanyaan.";

      return { reply: replyContent };
    }),
});
