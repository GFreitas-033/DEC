// controllers/admController.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get('/aluno', async (req, res) => {
    try {
        const responseAluno = await axios.get('http://localhost:5000/api/aluno');
        const dadosAluno = responseAluno.data;

        const responsePessoa = await axios.get('http://localhost:5000/api/pessoa');
        const dadosPessoa = responsePessoa.data;

        const idsAluno = new Set(dadosAluno.map(aluno => aluno.id_pessoa));

        const pessoasFiltradas = dadosPessoa.filter(pessoa => idsAluno.has(pessoa.id_pessoa));

        res.json(pessoasFiltradas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

router.get('/excluiraluno/:id_aluno', async (req, res) => {
    const id_aluno = parseInt(req.params.id_aluno);
    try {
        try {
            await axios.delete(`http://localhost:5000/api/aluno_has_turma/${id_aluno}`);
        } catch (error) {
            console.error(error);
        }
        await axios.delete(`http://localhost:5000/api/aluno/${id_aluno}`);
        await axios.delete(`http://localhost:5000/api/pessoa/${id_aluno}`);
        res.status(200).send('Registro excluído com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

router.get('/professor', async (req, res) => {
    try {
        const responseProfessor = await axios.get('http://localhost:5000/api/professor');
        const dadosProfessor = responseProfessor.data;

        const responsePessoa = await axios.get('http://localhost:5000/api/pessoa');
        const dadosPessoa = responsePessoa.data;

        const idsProfessor = new Set(dadosProfessor.map(professor => professor.id_pessoa));

        const pessoasFiltradas = dadosPessoa.filter(pessoa => idsProfessor.has(pessoa.id_pessoa));

        res.json(pessoasFiltradas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

router.get('/excluirprofessor/:id_professor', async (req, res) => {
    const id_professor = parseInt(req.params.id_professor);
    try {
        await axios.delete(`http://localhost:5000/api/professor/${id_professor}`);
        await axios.delete(`http://localhost:5000/api/pessoa/${id_professor}`);
        res.status(200).send('Registro excluído com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

router.get('/excluirunidade/:id_unidade', async (req, res) => {
    const id_unidade = parseInt(req.params.id_unidade);
    try {
        const responseTurmas = await axios.get('http://localhost:5000/api/turma');
        const dadosTurmas = responseTurmas.data;
        const turmasFiltradas = dadosTurmas.filter(turma => turma.id_unidade === id_unidade);

        const idsTurmasFiltradas = turmasFiltradas.map(turma => turma.id_turma);

        const responseAlunos_has_Turmas = await axios.get('http://localhost:5000/api/aluno_has_turma');
        const dadosAlunos_has_Turmas = responseAlunos_has_Turmas.data;
        const alu_turmasFiltradas = dadosAlunos_has_Turmas.filter(alunos_has_turma => idsTurmasFiltradas.includes(alunos_has_turma.id_turma));

        const promisesExcluirAlunos_has_Turmas = alu_turmasFiltradas.map(alunos_has_turma => axios.delete(`http://localhost:5000/api/aluno_has_turma/turma/${alunos_has_turma.id_turma}`));
        await Promise.all(promisesExcluirAlunos_has_Turmas);

        const promisesExcluirTurmas = turmasFiltradas.map(turma => axios.delete(`http://localhost:5000/api/turma/${turma.id_turma}`));
        await Promise.all(promisesExcluirTurmas);

        await axios.delete(`http://localhost:5000/api/unidade/${id_unidade}`);

        res.status(200).json({
            message: 'Unidade e turmas associadas excluídas com sucesso!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

router.get('/excluirturma/:id_turma', async (req, res) => {
    const id_turma = parseInt(req.params.id_turma);
    try {
        const responseAlunos_has_Turmas = await axios.get('http://localhost:5000/api/aluno_has_turma');
        const dadosAlunos_has_Turmas = responseAlunos_has_Turmas.data;
        const alu_turmasFiltradas = dadosAlunos_has_Turmas.filter(alunos_has_turma => alunos_has_turma.id_turma === id_turma);

        const promisesExcluirAlunos_has_Turmas = alu_turmasFiltradas.map(alunos_has_turma => axios.delete(`http://localhost:5000/api/aluno_has_turma/turma/${alunos_has_turma.id_turma}`));
        await Promise.all(promisesExcluirAlunos_has_Turmas);

        await axios.delete(`http://localhost:5000/api/turma/${id_turma}`);

        res.status(200).json({
            message: 'Turma e associações de alunos excluídas com sucesso!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

module.exports = router;
