const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Rota de teste
app.get("/", (req, res) => {
  res.send("🔥 Nexia Backend com IA funcionando!");
});

// Rota da IA
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é a IA Nexia: gentil, rápida e objetiva." },
        { role: "user", content: message }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar resposta da IA." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
