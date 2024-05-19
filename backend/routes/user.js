const express = require("express");
const router = express.Router();
const alunoModel = require("../models/aluno.js");

router.get('/dados', async (req, res) => {
    try {
        const data = await alunoModel.readAlunos();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.post('/dados', async (req, res) => {
    const novoValor = req.body.nome;
    try {
        await alunoModel.createAlunos(novoValor);
        res.status(201).send('Registro criado com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.put('/dados/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const novoValor = req.body.nome;
    try {
        await alunoModel.updateAlunos(id, novoValor);
        res.status(200).send('Registro atualizado com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.delete('/dados/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await alunoModel.deleteAlunos(id);
        res.status(200).send('Registro excluído com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;