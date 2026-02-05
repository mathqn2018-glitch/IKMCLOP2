
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "./constants";

// Use process.env.API_KEY exclusively and remove apiKey parameter
export const getGeminiResponse = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    // Use .text property directly
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

// Removed apiKey parameter to comply with security and SDK guidelines
export const generateExplanation = async (problem: any, userAnswer: string) => {
  const prompt = `Hãy giải thích bài toán sau cho học sinh lớp 2:
Câu hỏi: ${problem.question}
Đáp án đúng: ${problem.options[problem.correctIndex]}
Học sinh đã chọn: ${userAnswer}
Hãy phân tích vì sao đáp án đó đúng/sai và dạy cho bé cách tư duy bài này.`;
  
  return getGeminiResponse(prompt);
};
