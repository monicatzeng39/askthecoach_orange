import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;
let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';
    // If no key is present, this might throw depending on SDK version, 
    // but initializing lazily prevents app-wide crash on load.
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const startChatSession = (): Chat => {
  const client = getAiClient();
  chatSession = client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
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