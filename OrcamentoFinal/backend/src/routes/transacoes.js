// backend/src/routes/transacoes.js
const express = require('express');
const router = express.Router();

// ARRAY EM MEMÓRIA
// Dica: Se você parar o servidor, esses dados somem!
let transacoes = []; 

// 1. GET /transacoes - Lista tudo
router.get('/transacoes', (req, res) => {
    res.json(transacoes);
});

// 2. POST /transacoes - Cria novo lançamento
router.post('/transacoes', (req, res) => {
    const { descricao, valor, tipo, data } = req.body;

    // Validação simples (Campos obrigatórios)
    if (!descricao || !valor || !tipo || !data) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    // Cria o objeto da transação
    const novaTransacao = {
        id: Date.now(), // Gera um ID único baseado no tempo atual
        descricao,
        valor: Number(valor), // Garante que seja número
        tipo, // 'entrada' ou 'saida'
        data
    };

    transacoes.push(novaTransacao);

    // Retorna 201 (Created) e o objeto criado
    res.status(201).json(novaTransacao);
});

// 3. DELETE /transacoes/:id - Remove pelo ID
router.delete('/transacoes/:id', (req, res) => {
    const id = Number(req.params.id); // Pega o ID da URL

    // Verifica se existe (opcional, mas boa prática)
    const index = transacoes.findIndex(t => t.id === id);
    
    if (index === -1) {
        return res.status(404).json({ erro: "Transação não encontrada." });
    }

    // Remove do array
    // filter cria um novo array com todos MENOS o que tem aquele ID
    transacoes = transacoes.filter(t => t.id !== id);

    res.status(200).json({ mensagem: "Transação removida com sucesso!" });
});

// 4. GET /saldo - Calcula totais
router.get('/saldo', (req, res) => {
    // reduce percorre o array acumulando os valores
    const totalEntradas = transacoes
        .filter(t => t.tipo === 'entrada')
        .reduce((acc, cur) => acc + cur.valor, 0);

    const totalSaidas = transacoes
        .filter(t => t.tipo === 'saida')
        .reduce((acc, cur) => acc + cur.valor, 0);

    const saldoTotal = totalEntradas - totalSaidas;

    res.json({
        entradas: totalEntradas,
        saidas: totalSaidas,
        saldo: saldoTotal
    });
});

module.exports = router;