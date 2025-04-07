// controllers/alunoController.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const chamadaModel = require("../models/chamada.js");

router.post('/buscar', asyncHandler(async (req, res) => {
    const {id_turma, data_c} = req.body;
    const data = await chamadaModel.buscaChamada(id_turma,data_c);
    res.json(data);
}));

router.post('/enviar', asyncHandler(async (req, res) => {
    const { id_chamada, status_c, alunos, observacao } = req.body;
    await chamadaModel.enviarChamada(id_chamada, status_c, alunos, observacao);
    res.json({ success: true });
}));

module.exports = router;
