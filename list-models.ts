import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function listModels() {
    try {
        // There isn't a direct listModels method on the genAI instance in all versions
        // But we can try to access the discovery API or just try a different model name
        console.log("Checking model: gemini-1.5-flash-latest");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent("Hi");
        console.log("Success with gemini-1.5-flash-latest:", result.response.text());
    } catch (e) {
        console.error("Failed with gemini-1.5-flash-latest:", e.message);
    }

    try {
        console.log("Checking model: gemini-1.5-flash");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hi");
        console.log("Success with gemini-1.5-flash:", result.response.text());
    } catch (e) {
        console.error("Failed with gemini-1.5-flash:", e.message);
    }
}

listModels();
