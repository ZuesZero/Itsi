import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export const getGardenAdvice = async (question: string, lang: 'en' | 'es' = 'en') => {
  try {
    const prompt = lang === 'es' ?
    `Eres el Asistente Itsi, un experto en irrigación y jardinería de precisión.
    El usuario está utilizando un sistema de riego inteligente que mide la humedad del suelo, los datos meteorológicos y las necesidades de las plantas a nivel local.
    Responde a la siguiente pregunta de forma concisa y profesional en español: ${question}`
    : `You are the Itsi Assistant, an expert in precision irrigation and gardening. 
    The user is using a smart irrigation system that measures soil moisture, weather data, and localized plant needs.
    Answer the following question concisely and professionally in English: ${question}`;
    
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });
    
    return response.text || (lang === 'es' 
      ? "Procesé tu solicitud pero no obtuve una respuesta clara. ¿En qué más puedo ayudarte?" 
      : "I processed your request but didn't have a clear answer. How else can I help?");
  } catch (error) {
    console.error("AI Error:", error);
    return lang === 'es'
      ? "Tengo problemas para conectarme a mi base de datos de plantas en este momento. ¡Por favor, inténtalo de nuevo más tarde!"
      : "I'm having trouble connecting to my plant database right now. Please try again later!";
  }
};
