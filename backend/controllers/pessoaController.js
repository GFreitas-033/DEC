// controllers/pessoaController.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const pessoaModel = require("../models/pessoa.js");

router.get('/', asyncHandler(async (req, res) => {
    const data = await pessoaModel.readPessoa();
    res.json(data);
}));

router.post('/', asyncHandler(async (req, res) => {
    const {
        nome_pessoa,
        dt_nasc_pessoa,
        cpf_pessoa,
        rg_pessoa,
        email_pessoa,
        senha_pessoa,
        telefone_pessoa,
        genero,
        id_endereco
    } = req.body;

    await pessoaModel.createPessoa(
        nome_pessoa,
        dt_nasc_pessoa,
        cpf_pessoa,
        rg_pessoa,
        email_pessoa,
        senha_pessoa,
        telefone_pessoa,
        genero,
        id_endereco
    );
    res.status(201).send('Registro criado com sucesso!');
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id_pessoa = parseInt(req.params.id);
    const {
        nome_pessoa,
        dt_nasc_pessoa,
        cpf_pessoa,
        rg_pessoa,
        email_pessoa,
        senha_pessoa,
        telefone_pessoa,
        genero,
        id_endereco
    } = req.body;

    await pessoaModel.updatePessoa(
        id_pessoa,
        nome_pessoa,
        dt_nasc_pessoa,
        cpf_pessoa,
        rg_pessoa,
        email_pessoa,
        senha_pessoa,
        telefone_pessoa,
        genero,
        id_endereco
    );
    res.status(200).send('Registro atualizado com sucesso!');
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const id_pessoa = parseInt(req.params.id);
    await pessoaModel.deletePessoa(id_pessoa);
    res.status(200).send('Registro excluído com sucesso!');
}));

module.exports = router;
