import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function check() {
    try {
        // Attempting to list models via a hidden or experimental method if it exists
        // or just checking gemini-pro
        console.log("Checking gemini-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hi");
        console.log("Success with gemini-pro:", result.response.text());
    } catch (e) {
        console.error("Failed with gemini-pro:", e.message);
    }
}

check();
