// controllers/admController.js
const express = require("express");
const router = express.Router();
const alunoModel = require("../models/aluno");
const professorModel = require("../models/professor");
const pessoaModel = require("../models/pessoa");
const turmaModel = require("../models/turma");
const alunoHasTurmaModel = require("../models/aluno_has_turma");
const unidadeModel = require("../models/unidade");

router.get('/aluno', async (req, res) => {
    try {
        pessoasFiltradas = await alunoModel.readFilterAluno();
        res.json(pessoasFiltradas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

router.get('/excluiraluno/:id_aluno', async (req, res) => {
    const id_aluno = parseInt(req.params.id_aluno);
    try {
        await alunoModel.deleteAluno(id_aluno);
        res.status(200).send('Registro excluído com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

router.get('/professor', async (req, res) => {
    try {
        const dadosProfessor = await professorModel.readProfessor();

        const dadosPessoa = await pessoaModel.readPessoa();

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
        await professorModel.deleteProfessor(id_professor);
        await pessoaModel.deletePessoa(id_professor);
        res.status(200).send('Registro excluído com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

router.get('/excluirunidade/:id_unidade', async (req, res) => {
    const id_unidade = parseInt(req.params.id_unidade);
    try {
        const responseTurmas = await turmaModel.readTurma();
        const dadosTurmas = responseTurmas.data;
        const turmasFiltradas = dadosTurmas.filter(turma => turma.id_unidade === id_unidade);

        const idsTurmasFiltradas = turmasFiltradas.map(turma => turma.id_turma);

        const responseAlunos_has_Turmas = await alunoHasTurmaModel.readAlunoHasTurma();
        const dadosAlunos_has_Turmas = responseAlunos_has_Turmas.data;
        const alu_turmasFiltradas = dadosAlunos_has_Turmas.filter(alunos_has_turma => idsTurmasFiltradas.includes(alunos_has_turma.id_turma));

        const promisesExcluirAlunos_has_Turmas = alu_turmasFiltradas.map(alunos_has_turma => alunoHasTurmaModel.deleteAlunoHasTurma_Turma(alunos_has_turma.id_turma));
        await Promise.all(promisesExcluirAlunos_has_Turmas);

        const promisesExcluirTurmas = turmasFiltradas.map(turma => turmaModel.deleteTurma(turma.id_turma));
        await Promise.all(promisesExcluirTurmas);

        await unidadeModel.deleteUnidade(id_unidade);

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
        const responseAlunos_has_Turmas = alunoHasTurmaModel.readAlunoHasTurma();
        const dadosAlunos_has_Turmas = responseAlunos_has_Turmas.data;
        const alu_turmasFiltradas = dadosAlunos_has_Turmas.filter(alunos_has_turma => alunos_has_turma.id_turma === id_turma);

        const promisesExcluirAlunos_has_Turmas = alu_turmasFiltradas.map(alunos_has_turma => alunoHasTurmaModel.deleteAlunoHasTurma_Turma(alunos_has_turma.id_turma));
        await Promise.all(promisesExcluirAlunos_has_Turmas);

        await turmaModel.deleteTurma(id_turma);

        res.status(200).json({
            message: 'Turma e associações de alunos excluídas com sucesso!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

module.exports = router;
