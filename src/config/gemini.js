import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from "dotenv";

// Load environment variables from key.env
dotenv.config({ path: '../key.env' });

const apiKey = import.meta.env.VITE_API_KEY; // Use environment variable for the API key
const genAI = new GoogleGenerativeAI(apiKey);
console.log("API Key:", process.env.API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
}

export default run;
