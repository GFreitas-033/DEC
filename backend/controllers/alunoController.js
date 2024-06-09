// controllers/alunoController.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const alunoModel = require("../models/aluno.js");

router.get('/', asyncHandler(async (req, res) => {
    const data = await alunoModel.readAluno();
    res.json(data);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { id_pessoa, destro_canhoto, id_responsavel } = req.body;
    await alunoModel.createAluno(id_pessoa, destro_canhoto, id_responsavel);
    res.status(201).send('Registro criado com sucesso!');
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const novoValor = req.body.nome;
    await alunoModel.updateAluno(id, novoValor);
    res.status(200).send('Registro atualizado com sucesso!');
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    await alunoModel.deleteAluno(id);
    res.status(200).send('Registro excluído com sucesso!');
}));

module.exports = router;
