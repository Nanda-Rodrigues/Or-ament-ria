// backend/src/server.js
const express = require('express');
const cors = require('cors');
const transacoesRoutes = require('./routes/transacoes'); // Importa as rotas

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Habilita o servidor a entender JSON
app.use(cors()); // Permite requisições de outras origens (como seu front-end)

// Rotas
app.use('/', transacoesRoutes); // Usa as rotas definidas no outro arquivo

// Rota de teste simples
app.get('/', (req, res) => {
    res.send('Servidor rodando! API de Finanças Pessoais.');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});