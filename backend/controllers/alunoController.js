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
    const { id_pessoa, destro_canhoto, id_responsavel, dt_inicio, tipo_plano, dia_pagamento, tipo_aluno, id_responsavel2 } = req.body;
    await alunoModel.createAluno(id_pessoa, destro_canhoto, id_responsavel, dt_inicio, tipo_plano, dia_pagamento, tipo_aluno, id_responsavel2);
    res.status(201).send('Registro criado com sucesso!');
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id_pessoa = parseInt(req.params.id);
    const { destro_canhoto, id_responsavel, tipo_plano, dia_pagamento, tipo_aluno, id_responsavel2} = req.body;
    await alunoModel.updateAluno(id_pessoa, destro_canhoto, id_responsavel,tipo_plano, dia_pagamento, tipo_aluno, id_responsavel2);
    res.status(200).send('Registro atualizado com sucesso!');
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const id_pessoa = parseInt(req.params.id);
    await alunoModel.deleteAluno(id_pessoa);
    res.status(200).send('Registro excluído com sucesso!');
}));

router.get('/allData/:id', asyncHandler(async (req, res) =>{
    const id_aluno = parseInt(req.params.id);
    const data = await alunoModel.allDataAluno(id_aluno);
    res.json(data);
}))

router.get('/turmas/:id', asyncHandler(async (req, res) =>{
    const id_aluno = parseInt(req.params.id);
    const data = await alunoModel.getTurmas(id_aluno);
    res.json(data);
}))

router.get('/responsaveis/:id', asyncHandler(async (req, res) =>{
    const id_aluno = parseInt(req.params.id);
    const data = await alunoModel.getResponsaveis(id_aluno);
    res.json(data);
}))

module.exports = router;
