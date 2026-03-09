import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
