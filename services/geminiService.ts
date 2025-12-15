import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

// Initialize the API client
// Note: In a real environment, process.env.API_KEY is populated by the build system or runtime.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const startChatSession = (): Chat => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7, // Balance between creative coach persona and logic
    },
    history: [], 
  });
  return chatSession;
};

export const getChatSession = (): Chat => {
  if (!chatSession) {
    return startChatSession();
  }
  return chatSession;
};

export const sendMessageStream = async (message: string) => {
  const chat = getChatSession();
  try {
    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
