// backend/src/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

// Imports usa módulo 'path' para garantir que o caminho funcione, independente de 'src/'
const db = require(path.join(__dirname, "..", "db"));
const usuariosRoutes = require(path.join(
  __dirname,
  "..",
  "routes",
  "usuarios-routes"
));

const app = express();
const PORT = 3000;

// Middlewares

app.use(express.json());
app.use(cors());

// Rotas (Prefixadas)

app.use("/api/usuarios", usuariosRoutes);

// Rota de teste simples
app.get("/", (req, res) => {
  res.send("Servidor rodando! API de Usuários/Finanças. Acesse /api/usuarios.");
});

// Iniciar servidor

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
