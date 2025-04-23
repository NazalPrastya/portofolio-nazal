import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateResponse(prompt: string, aboutYou: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const fullPrompt = `
    Anda adalah asisten virtual untuk portofolio seseorang. 
    Berikut informasi tentang pemilik portofolio:
    ${aboutYou}
    
    Jawablah pertanyaan berikut dengan sopan dan informatif:
    ${prompt}
  `;

  const result = await model.generateContent(fullPrompt);
  const response = result.response;
  return response.text();
}
