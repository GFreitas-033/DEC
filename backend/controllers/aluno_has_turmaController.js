// controllers/aluno_has_turmaController.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const aluno_has_turmaModel = require("../models/aluno_has_turma.js");

router.get('/', asyncHandler(async (req, res) => {
    const data = await aluno_has_turmaModel.readAlunoHasTurma();
    res.json(data);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { id_aluno, id_turma } = req.body;
    await aluno_has_turmaModel.createAlunoHasTurma(id_aluno, id_turma);
    res.status(201).send('Registro criado com sucesso!');
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id_aluno = parseInt(req.params.id);
    const { id_turma } = req.body;
    await aluno_has_turmaModel.updateAlunoHasTurma(id_aluno, id_turma);
    res.status(200).send('Registro atualizado com sucesso!');
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const id_aluno = parseInt(req.params.id);
    await aluno_has_turmaModel.deleteAluno(id_aluno);
    res.status(200).send('Registro excluído com sucesso!');
}));

module.exports = router;
