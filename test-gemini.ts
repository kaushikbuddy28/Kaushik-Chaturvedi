import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function test() {
    try {
        const chat = model.startChat({
            history: [
                {
                    role: "model",
                    parts: [{ text: "Hello" }]
                }
            ]
        });
        console.log("Chat started successfully with model role first (surprisingly)");
    } catch (e) {
        console.error("Chat failed with model role first:", e.message);
    }

    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Hello" }]
                }
            ]
        });
        console.log("Chat started successfully with user role first");
    } catch (e) {
        console.error("Chat failed with user role first:", e.message);
    }
}

test();
