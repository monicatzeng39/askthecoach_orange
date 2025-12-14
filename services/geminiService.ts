import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;
let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    // Safety check: In browser environments (like GitHub Pages), process might not be defined.
    // We strictly follow the guideline to use process.env.API_KEY, but we wrap it 
    // to prevent "ReferenceError: process is not defined" which crashes the app.
    let apiKey = '';
    try {
        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
            apiKey = process.env.API_KEY;
        }
    } catch (e) {
        // Fallback for strict browser environments where accessing process throws
        console.warn("Environment variable access skipped.");
    }

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

export const sendMessageStream = async (message: string) =>