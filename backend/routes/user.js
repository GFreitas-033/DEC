// routes/user.js
const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController.js");
const enderecoController = require("../controllers/enderecoController.js");
const pessoaController = require("../controllers/pessoaController.js");

// Definindo as rotas principais para os controladores
router.use("/api/aluno", alunoController);
router.use("/api/endereco", enderecoController);
router.use("/api/pessoa", pessoaController);

module.exports = router;
