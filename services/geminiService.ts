import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Assuming generic environment handling for the demo
const ai = new GoogleGenAI({ apiKey });

export const getDailyMessage = async (): Promise<string> => {
  if (!apiKey) {
    // Fallback if no API key is present in the environment
    return "O silêncio também é um lugar onde Deus trabalha.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gere uma frase curta, reconfortante e espiritual (cristã, não religiosa demais) para uma mulher que está passando por um término de relacionamento. A frase deve ter no máximo 20 palavras e focar em paz, espera e confiança em Deus. Sem aspas.",
    });
    return response.text?.trim() || "O tempo de Deus é perfeito e traz cura.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "O amor de Deus é a âncora que segura sua alma.";
  }
};
