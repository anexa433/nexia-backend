const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("🔥 Nexia Backend funcionando com sucesso!");
});

// Rota para responder mensagens (simulação de IA)
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensagem é obrigatória" });
  }

  res.json({
    reply: `Você disse: ${message}. A IA Nexia está online!`,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Nexia backend rodando na porta ${PORT}`);
});
