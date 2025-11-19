import express from "express";
import cors from "cors";
import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `
You are Nexia, a friendly and helpful assistant created by the user.
Respond in a warm and human tone.
`;

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Nexia backend está rodando!");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Servidor ativo na porta 3000")
);
