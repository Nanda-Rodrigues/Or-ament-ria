const express = require("express");
const router = express.Router();
const path = require("path");
const UsuariosController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "usuarios-controller"
));

// Mapeamento de Rotas (Prefixadas com /api/usuarios)

router.get("/", UsuariosController.listarTransacoes);

router.post("/", UsuariosController.criarLancamento);

router.delete("/:id", UsuariosController.deletarLancamento);

router.get("/saldo", UsuariosController.obterSaldo);

module.exports = router;
