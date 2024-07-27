// controllers/turmaController.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const turmaModel = require("../models/turma.js");

router.get('/', asyncHandler(async (req, res) => {
    const data = await turmaModel.readTurma();
    res.json(data);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { qtd_maxima, id_professor, dia_semana, horario, id_unidade, nome_turma} = req.body;
    await turmaModel.createTurma(qtd_maxima, id_professor, dia_semana, horario, id_unidade, nome_turma);
    res.status(201).send('Registro criado com sucesso!');
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id_turma = parseInt(req.params.id);
    const { qtd_maxima, id_professor, dia_semana, horario, id_unidade, nome_turma } = req.body;
    await turmaModel.updateTurma(id_turma, qtd_maxima, id_professor, dia_semana, horario, id_unidade, nome_turma);
    res.status(200).send('Registro atualizado com sucesso!');
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const id_turma = parseInt(req.params.id);
    await turmaModel.deleteTurma(id_turma);
    res.status(200).send('Registro excluído com sucesso!');
}));

module.exports = router;
