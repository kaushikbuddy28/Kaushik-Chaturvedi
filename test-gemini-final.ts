import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_CONTEXT = "You are a helpful assistant.";

// I'm simulating how the model is initialized in server.ts now
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_CONTEXT
});

async function test() {
    console.log("Testing with systemInstruction and correct history sequence...");

    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Who are you?" }]
                },
                {
                    role: "model",
                    parts: [{ text: "I am Kaushik's AI assistant." }]
                }
            ]
        });

        const result = await chat.sendMessage("What can you do?");
        const response = await result.response;
        console.log("Response:", response.text());
        console.log("Success!");
    } catch (e) {
        console.error("Test failed:", e.message);
    }
}

test();
