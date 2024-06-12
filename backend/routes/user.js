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

router.use("/api/aluno", alunoController);
router.use("/api/endereco", enderecoController);
router.use("/api/pessoa", pessoaController);
router.use("/api/professor", professorController);
router.use("/api/turma", turmaController);
router.use("/api/unidade", unidadeController);
router.use("/api/aluno_has_turma", aluno_has_turmaController);
router.use("/api/responsavel_aluno", responsavel_alunoController);
router.use("/api/responsavel_unidade", responsavel_unidadeController);

router.post("/login", async (req, res) => {
    const { email, senha } = req.body;
    if (req.session.id_pessoa) {
        try {
            let id_pessoa = req.session.id_pessoa;
            const response = await axios.get('http://localhost:5000/api/pessoa');
            const dados = response.data;
            const pessoa = dados.find(p => p.id_pessoa === id_pessoa);
            return res.json(pessoa.nome_pessoa);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar dados", error: error.message });
        }
    } else {
        try {
            const response = await axios.get('http://localhost:5000/api/pessoa');
            const dados = response.data;
            const pessoa = dados.find(p => p.email_pessoa === email);

            if (!pessoa) {
                return res.status(404).json({ message: "Email inválido" });
            } else if (pessoa.senha_pessoa !== senha) {
                return res.status(404).json({ message: "Senha incorreta" });
            }
            req.session.id_pessoa = pessoa.id_pessoa;
            return res.json({ nome: pessoa.nome_pessoa });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar dados", error: error.message });
        }
    }
});

router.get('/sair', (req, res) => {
    req.session.destroy();
    res.json({ message: "Sessão encerrada com sucesso" });
});

router.get('/calendario', async (req, res) => {
    let id_pessoa = req.session.id_pessoa;

    try {
        // Verifica se a pessoa é um professor
        const responseProfessor = await axios.get('http://localhost:5000/api/professor');
        const dadosProfessor = responseProfessor.data;
        const professor = dadosProfessor.find(p => p.id_pessoa === id_pessoa);

        let turmas;
        if (professor) {
            // Se for professor, busca as turmas do professor
            const responseTurmas = await axios.get('http://localhost:5000/api/turma');
            const dadosTurmas = responseTurmas.data;
            turmas = dadosTurmas.filter(turma => turma.id_professor === id_pessoa);
        } else {
            // Caso contrário, assume que é um aluno
            const responseTurmasAluno = await axios.get('http://localhost:5000/api/aluno_has_turma');
            const dadosTurmasAluno = responseTurmasAluno.data;
            const turmasAluno = dadosTurmasAluno.filter(p => p.id_aluno === id_pessoa);
            const idTurmas = turmasAluno.map(turma => turma.id_turma);

            const responseMinhasTurmas = await axios.get('http://localhost:5000/api/turma');
            const dadosMinhasTurmas = responseMinhasTurmas.data;
            turmas = dadosMinhasTurmas.filter(turma => idTurmas.includes(turma.id_turma));
        }

        const turmasFiltradas = turmas.map(turma => ({
            dia_semana: turma.dia_semana,
            horario: turma.horario,
            id_unidade: turma.id_unidade
        }));

        const responseUnidades = await axios.get('http://localhost:5000/api/unidade');
        const dadosUnidades = responseUnidades.data;
        const idsUnidades = turmasFiltradas.map(item => item.id_unidade);
        const unidadesFiltradas = dadosUnidades.filter(unidade => idsUnidades.includes(unidade.id_unidade));

        const unidadesMap = unidadesFiltradas.reduce((map, unidade) => {
            map[unidade.id_unidade] = unidade.id_endereco;
            return map;
        }, {});

        const turmasComEndereco = turmasFiltradas.map(turma => ({
            dia_semana: turma.dia_semana,
            horario: turma.horario,
            id_endereco: unidadesMap[turma.id_unidade] || turma.id_unidade
        }));

        const responseEnderecos = await axios.get('http://localhost:5000/api/endereco');
        const dadosEnderecos = responseEnderecos.data;

        const enderecosMap = dadosEnderecos.reduce((map, endereco) => {
            map[endereco.id_endereco] = `${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}`;
            return map;
        }, {});

        const turmasComEnderecoCompleto = turmasComEndereco.map(turma => ({
            dia_semana: turma.dia_semana,
            horario: turma.horario,
            endereco_completo: enderecosMap[turma.id_endereco] || turma.id_endereco
        }));

        res.json(turmasComEnderecoCompleto);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar dados", error: error.message });
    }
});

module.exports = router;
