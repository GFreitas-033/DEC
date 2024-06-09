// controllers/enderecoController.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const enderecoModel = require("../models/endereco.js");

router.post('/', asyncHandler(async (req, res) => {
    const { cep, estado, cidade, bairro, rua, numero } = req.body;
    await enderecoModel.createEndereco(cep, estado, cidade, bairro, rua, numero);
    res.status(201).send('Registro criado com sucesso!');
}));

router.get('/', asyncHandler(async (req, res) => {
    const data = await enderecoModel.readEndereco();
    res.json(data);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id_endereco = parseInt(req.params.id);
    const { cep, estado, cidade, bairro, rua, numero } = req.body;
    await enderecoModel.updateEndereco(id_endereco, cep, estado, cidade, bairro, rua, numero);
    res.status(200).send('Registro atualizado com sucesso!');
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const id_endereco = parseInt(req.params.id);
    await enderecoModel.deleteEndereco(id_endereco);
    res.status(200).send('Registro excluído com sucesso!');
}));

module.exports = router;
