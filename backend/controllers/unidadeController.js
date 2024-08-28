// controllers/unidadeController.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const unidadeModel = require("../models/unidade.js");

router.get('/', asyncHandler(async (req, res) => {
    const data = await unidadeModel.readUnidade();
    res.json(data);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco} = req.body;
    await unidadeModel.createUnidade(nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco);
    res.status(201).send('Registro criado com sucesso!');
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id_unidade = parseInt(req.params.id);
    const { nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco} = req.body;
    await unidadeModel.updateUnidade(id_unidade, nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco);
    res.status(200).send('Registro atualizado com sucesso!');
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const id_unidade = parseInt(req.params.id);
    await unidadeModel.deleteUnidade(id_unidade);
    res.status(200).send('Registro excluído com sucesso!');
}));

module.exports = router;
