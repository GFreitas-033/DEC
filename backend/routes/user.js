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
const admController = require("../controllers/admController.js");
const chamadaController = require("../controllers/chamadaController.js");

router.use("/api/aluno", alunoController);
router.use("/api/endereco", enderecoController);
router.use("/api/pessoa", pessoaController);
router.use("/api/professor", professorController);
router.use("/api/turma", turmaController);
router.use("/api/unidade", unidadeController);
router.use("/api/aluno_has_turma", aluno_has_turmaController);
router.use("/api/responsavel_aluno", responsavel_alunoController);
router.use("/api/responsavel_unidade", responsavel_unidadeController);
router.use("/api/chamada",chamadaController);
router.use("/", loginController);
router.use("/", calendarioController);
router.use("/adm", admController);

router.get('/listaralunos/:idturma', async (req, res) => {
    const id_turma = parseInt(req.params.idturma);
    try {
        // Buscar os relacionamentos entre alunos e turmas
        const responseTurmas_Alunos = await axios.get('http://localhost:5000/api/aluno_has_turma');
        const dadosTurmas_Alunos = responseTurmas_Alunos.data;

        // Filtrar os alunos pertencentes à turma especificada
        const alunosTurma = dadosTurmas_Alunos
            .filter(dado => dado.id_turma === id_turma)
            .map(dado => dado.id_aluno);

        // Buscar os dados das pessoas
        const responsePessoa = await axios.get('http://localhost:5000/api/pessoa');
        const dadosPessoa = responsePessoa.data;

        // Filtrar as pessoas que são alunos da turma e retornar id e nome
        const alunosDetalhados = dadosPessoa
            .filter(pessoa => alunosTurma.includes(pessoa.id_pessoa))
            .map(pessoa => ({
                id_pessoa: pessoa.id_pessoa,
                nome_pessoa: pessoa.nome_pessoa
            }));

        res.json(alunosDetalhados);

    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar dados da turma", error: error.message });
    }
});


// Nova rota para listar todos os alunos
router.get('/listartodosalunos', async (req, res) => {
    try {
        // Pega todos os alunos e seus IDs
        const responseAlunos = await axios.get('http://localhost:5000/api/aluno');
        const dadosAlunos = responseAlunos.data;
        const idsAlunos = dadosAlunos.map(aluno => aluno.id_pessoa);

        // Pega todas as pessoas
        const responsePessoa = await axios.get('http://localhost:5000/api/pessoa');
        const dadosPessoa = responsePessoa.data;

        // Filtra as pessoas pelos IDs dos alunos
        const alunos = dadosPessoa
            .filter(pessoa => idsAlunos.includes(pessoa.id_pessoa))
            .map(pessoa => ({
                id_aluno: pessoa.id_pessoa,
                nome_aluno: pessoa.nome_pessoa
            }));

        res.json(alunos);

    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar todos os alunos", error: error.message });
    }
});

module.exports = router;
