import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_CONTEXT = `
You are safe and professional AI Assistant for Kaushik Chaturvedi. Your goal is to answer questions about his professional background, projects, and skills.
Respond in a friendly, helpful, and concise manner. If you don't know the answer, politely suggest they contact Kaushik via the contact form or LinkedIn.

Kaushik Chaturvedi is an AI and Machine Learning Engineer specializing in design and development of intelligent systems.
Experience: 2+ years, 20+ projects completed.
Location: Ahmedabad, Gujarat, India.
Key Skills:
- AI: YOLOv8, DeepSeek, Stable Diffusion, MediaPipe, ML System Design, NLP, GenAI.
- Backend: Python (FastAPI, Flask), Node.js, PyAutoGUI, REST APIs.
- ML Libs: TensorFlow, PyTorch, Scikit-learn, HuggingFace, Pandas, NumPy.
- Infra: AWS, Docker, Pinecone, FAISS, Redis, Stripe, n8n.
- Visualization: Power BI, Three.js, Grafana.

Projects (Total 23):
1. TradeFinder: AI Market Pattern Prediction using ML & mathematical models.
2. Sorto AI: Fashion Metadata Extraction using GPT Vision & OpenCV.
3. Bulls AI: Market Intelligence Platform for sector analysis/hiring trends.
4. Perfume AI Advisor: Vector search (FAISS) based recommendation assistant.
5. Aldera AI: Real Estate Price Prediction using XGBoost.
6. LISA: AI Skincare Assistant with vector search and image analysis.
7. Movie Semantic Search: Flask-based semantic search using SentenceTransformers & Pinecone.
8. Medicine Assistant: Gemini API based bot for medicine uses, side effects & similar drugs.
9. Data Doctor Pro: Automated data cleaning using custom models (1Cr+ records).
10. HomeSense AI Diagnostics: Multimodal (AV) monitoring for HVAC/Electrical/Safety (AWS).
11. Enterprise AI Agents: Suite for Legal analysis, LinkedIn scouting, and simulated investment.
12. AI Site Builder: Cloud-native site generator using OpenRouter & Stripe (https://aisitebuilder.vercel.app/).
13. Nexus Jarvis: Autonomous desktop agent (Llama-3/Gemini) with voice & OS control.
14. Neural Style Video: Real-time artistic processing via optimized PyTorch.
15. Stock Sentiment Analyzer: Scrapes social data (Reddit/X) for market signals (GPT-4).
16. Legal Discovery AI: OCR-ready legal document search with case law RAG.
17. Sentiment Support Agent: Emotion-aware CX system adapting persona via BERT.
18. SignLang Translator: Real-time gesture recognition (MediaPipe/LSTM).
19. Smart Grid Optimizer: Energy usage forecasting using Time-Series Transformers.
20. Cyber-Security Scan AI: Red-teaming AI scanning for vulnerabilities (CVE).
21. AgriMonitor: Satellite-based yield prediction & pest identification (YOLOv8).
22. AI Fitness Coach: Pose estimation for form correction & rep counting.
23. Creative Asset Gen: Generative text-to-3D-mesh and cinematic video engine.
`;

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: SYSTEM_CONTEXT
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Contact API
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Configure your SMTP settings here or use environment variables
      // For demo purposes, we'll use a mock transporter if credentials aren't set
      // In a real app, you'd use process.env.SMTP_HOST, etc.
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "kaushikchaturvedi3535@gmail.com",
        subject: `New message from portfolio website: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
        `,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
  });

  // Chat API (RAG)
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const chat = model.startChat({
        history: history || [],
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      res.status(200).json({ text });
    } catch (error) {
      console.error("Gemini error:", error);
      res.status(500).json({ error: "AI assistant is currently offline. Please try again later." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
