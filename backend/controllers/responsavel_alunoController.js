// controllers/responsavel_alunoController.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const responsavel_alunoModel = require("../models/responsavel_aluno.js");

router.get('/', asyncHandler(async (req, res) => {
    const data = await responsavel_alunoModel.readResponsavelAluno();
    res.json(data);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { id_pessoa } = req.body;
    await responsavel_alunoModel.createResponsavelAluno(id_pessoa);
    res.status(201).send('Registro criado com sucesso!');
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_pessoa } = req.body;
    await responsavel_alunoModel.updateResponsavelAluno(id, id_pessoa);
    res.status(200).send('Registro atualizado com sucesso!');
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const id_pessoa = parseInt(req.params.id);
    await responsavel_alunoModel.deleteResponsavelAluno(id_pessoa);
    res.status(200).send('Registro excluído com sucesso!');
}));

module.exports = router;
