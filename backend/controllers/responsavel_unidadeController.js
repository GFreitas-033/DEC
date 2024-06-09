// controllers/responsavel_unidadeController.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const responsavel_unidadeModel = require("../models/responsavel_unidade.js");

router.get('/', asyncHandler(async (req, res) => {
    const data = await responsavel_unidadeModel.readResponsavelUnidade();
    res.json(data);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { id_pessoa } = req.body;
    await responsavel_unidadeModel.createResponsavelUnidade(id_pessoa);
    res.status(201).send('Registro criado com sucesso!');
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_pessoa } = req.body;
    await responsavel_unidadeModel.updateResponsavelUnidade(id, id_pessoa);
    res.status(200).send('Registro atualizado com sucesso!');
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const id_pessoa = parseInt(req.params.id);
    await responsavel_unidadeModel.deleteResponsavelUnidade(id_pessoa);
    res.status(200).send('Registro excluído com sucesso!');
}));

module.exports = router;
