const path = require("path");
const UsuarioModel = require(path.join(
  __dirname,
  "..",
  "models",
  "usuario-model"
));

const UsuariosController = {
  listarTransacoes: async (req, res) => {
    try {
      const transacoes = await UsuarioModel.listarTransacoes();
      res.status(200).json(transacoes);
    } catch (error) {
      console.error("Erro ao listar:", error.message);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  criarLancamento: async (req, res) => {
    const { descricao, valor, tipo, data } = req.body;

    if (!descricao || !valor || !tipo || !data) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    try {
      const lancamentoAdicionado = await UsuarioModel.criarLancamento({
        descricao,
        valor,
        tipo,
        data,
      });
      res.status(201).json(lancamentoAdicionado);
    } catch (error) {
      console.error("Erro ao criar:", error.message);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  deletarLancamento: async (req, res) => {
    const id = Number(req.params.id);

    try {
      const linhasAfetadas = await UsuarioModel.deletarLancamento(id);

      if (linhasAfetadas === 0) {
        return res.status(404).json({ erro: "Transação não encontrada." });
      }
      res.status(200).json({ mensagem: "Transação removida com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar:", error.message);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  obterSaldo: async (req, res) => {
    try {
      const saldo = await UsuarioModel.calcularSaldo();
      res.status(200).json(saldo);
    } catch (error) {
      console.error("Erro ao calcular saldo:", error.message);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  },
};

module.exports = UsuariosController;
