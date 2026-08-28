import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* Middleware */
app.use(cors());
app.use(express.json());

/* Health Check */
app.get("/", (req, res) => {
  res.json({
    message: "NovaChat backend is running",
  });
});

/* Chat Endpoint */
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  /* Validate messages */
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: "Messages are required",
    });
  }

  try {
    /* Convert frontend messages to Gemini format */
    const conversationHistory = messages
      .filter(
        (message) =>
          typeof message?.content === "string" &&
          message.content.trim() &&
          ["user", "assistant"].includes(message.role)
      )
      .map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [
          {
            text: message.content.trim(),
          },
        ],
      }));

    if (conversationHistory.length === 0) {
      return res.status(400).json({
        error: "No valid messages found",
      });
    }

    /* Generate AI response */
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",

      contents: conversationHistory,

      config: {
        systemInstruction: `
You are NovaChat, a smart, helpful, and natural conversational AI assistant.

LANGUAGE RULES:
- Understand English, Hindi, Marathi, and Marathi written in Roman letters.
- Reply in the same language style used by the user.
- Never randomly switch languages.
- If the user writes Roman Marathi, reply naturally in Roman Marathi.
- Understand casual conversation, jokes, and slang.

RESPONSE STYLE:
- Answer the user's actual question directly.
- Keep simple answers concise.
- Give detailed explanations when requested.
- Do not unnecessarily repeat the user's question.
- Avoid huge walls of text.
- Use Markdown when it improves readability.
- Use headings, bullet points, numbered lists, and code blocks when useful.
- For programming questions, provide practical and correct examples.
- If unsure, say so instead of inventing information.
- Be friendly, natural, and conversational.
        `.trim(),

        maxOutputTokens: 2048,
      },
    });

    const reply = response.text;

    if (!reply) {
      return res.status(500).json({
        error: "AI returned an empty response",
      });
    }

    return res.json({
      reply,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    return res.status(500).json({
      error:
        error?.message ||
        "Something went wrong while contacting Gemini",
    });
  }
});

/* Start Server */
app.listen(PORT, () => {
  console.log(`NovaChat backend running on port ${PORT}`);
});