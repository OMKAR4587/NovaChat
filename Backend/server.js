import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {GoogleGenAI} from "@google/genai"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors());
app.use(express.json());


// Health check
app.get("/", (req, res) => {
  res.json({
    message: "NovaChat backend is running",
  });
});


// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  // Validate request
  if (!message?.trim()) {
    return res.status(400).json({
      error: "Message is required",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",

      contents: message,

      config: {
        systemInstruction: `
You are NovaChat, a smart, helpful, natural conversational AI assistant.

LANGUAGE RULES:
- Understand English, Hindi, Marathi, and Marathi written in Roman/English letters.
- Reply in the same language the user is using.
- Never randomly switch to another language.
- If the user writes Roman Marathi, reply naturally in Roman Marathi.
- Understand casual conversation, jokes, and slang.

RESPONSE STYLE:
- Answer the user's actual question directly.
- Keep simple questions short.
- Give detailed explanations when the user asks for them.
- Do not unnecessarily repeat the user's question.
- Do not produce unnecessarily long answers.
- Avoid huge walls of text.
- Use Markdown when it improves readability.
- Use headings, bullet points, numbered lists, and code blocks when useful.
- For programming questions, provide practical and correct examples.
- If you are unsure about something, say so instead of inventing information.
- Be friendly, natural, and conversational.
`,
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


app.listen(PORT, () => {
  console.log(`NovaChat backend running on port ${PORT}`);
});