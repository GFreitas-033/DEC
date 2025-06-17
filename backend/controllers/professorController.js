// controllers/professorController.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const professorModel = require("../models/professor.js");

router.get('/', asyncHandler(async (req, res) => {
    const data = await professorModel.readProfessor();
    res.json(data);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { id_pessoa, caminho_foto } = req.body;
    await professorModel.createProfessor(id_pessoa, caminho_foto);
    res.status(201).send('Registro criado com sucesso!');
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id_pessoa = parseInt(req.params.id);
    const {caminho_foto } = req.body;
    await professorModel.updateProfessor(id_pessoa, caminho_foto);
    res.status(200).send('Registro atualizado com sucesso!');
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const id_pessoa = parseInt(req.params.id);
    await professorModel.deleteProfessor(id_pessoa);
    res.status(200).send('Registro excluído com sucesso!');
}));

router.get('/:id/turmas', asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "O ID do professor é obrigatório." });
    }
    const turmas = await professorModel.findTurmasByProfessorId(id);
    res.json(turmas);
}));

module.exports = router;
