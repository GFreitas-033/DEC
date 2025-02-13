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
    const { nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, tipo} = req.body;
    await unidadeModel.createUnidade(nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, tipo);
    res.status(201).send('Registro criado com sucesso!');
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id_unidade = parseInt(req.params.id);
    const { nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, tipo} = req.body;
    console.log(nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, tipo)
    await unidadeModel.updateUnidade(id_unidade, nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, tipo);
    res.status(200).send('Registro atualizado com sucesso!');
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const id_unidade = parseInt(req.params.id);
    await unidadeModel.deleteUnidade(id_unidade);
    res.status(200).send('Registro excluído com sucesso!');
}));

router.post('/cidade', asyncHandler(async (req, res) => {
    const { cidade } = req.body;

    if (!cidade) {
        return res.status(400).json({ error: "O nome da cidade é obrigatório." });
    }

    try {
        const unidades = await unidadeModel.findUnidadesByCidade(cidade);

        if (unidades.length === 0) {
            return res.status(404).json({ message: "Nenhuma unidade encontrada para essa cidade." });
        }

        res.json(unidades);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar unidades: " + error.message });
    }
}));

module.exports = router;
