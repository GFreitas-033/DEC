// routes/user.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const alunoController = require("../controllers/alunoController.js");
const enderecoController = require("../controllers/enderecoController.js");
const pessoaController = require("../controllers/pessoaController.js");
const turmaController = require("../controllers/turmaController.js");
const aluno_has_turmaController = require("../controllers/aluno_has_turmaController.js");
const unidadeController = require("../controllers/unidadeController.js");
const responsavel_alunoController = require("../controllers/responsavel_alunoController.js");
const responsavel_unidadeController = require("../controllers/responsavel_unidadeController.js");
const professorController = require("../controllers/professorController.js");
const loginController = require("../controllers/loginController.js");
const calendarioController = require("../controllers/calendarioController.js");

router.use("/api/aluno", alunoController);
router.use("/api/endereco", enderecoController);
router.use("/api/pessoa", pessoaController);
router.use("/api/professor", professorController);
router.use("/api/turma", turmaController);
router.use("/api/unidade", unidadeController);
router.use("/api/aluno_has_turma", aluno_has_turmaController);
router.use("/api/responsavel_aluno", responsavel_alunoController);
router.use("/api/responsavel_unidade", responsavel_unidadeController);
router.use("/", loginController);
router.use("/", calendarioController);

module.exports = router;
