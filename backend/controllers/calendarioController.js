// controllers/calendarioController.js
const express = require("express");
const router = express.Router();
const pessoaModel = require("../models/pessoa");
const professorModel = require("../models/professor");
const turmaModel = require("../models/turma");


router.get('/calendario', async (req, res) => {
    const id_pessoa = req.session.id_pessoa;

    if (!id_pessoa) {
        return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
        // 1. Determina o perfil do usuário (Admin, Professor ou Aluno)
        const pessoa = await pessoaModel.findById(id_pessoa);
        if (!pessoa) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        const isProfessor = await professorModel.findById(id_pessoa);

        let turmasComDetalhes;
        // 2. Busca as turmas com base no perfil
        if (pessoa.adm === 1) {
            // Se for Administrador, busca todas as turmas
            turmasComDetalhes = await turmaModel.findAllWithDetails();
        } else if (isProfessor) {
            // Se for Professor, busca apenas as suas turmas
            turmasComDetalhes = await turmaModel.findByProfessorWithDetails(id_pessoa);
        } else {
            // Caso contrário, assume que é um Aluno
            turmasComDetalhes = await turmaModel.findByAlunoWithDetails(id_pessoa);
        }

        res.json(turmasComDetalhes);

    } catch (error) {
        console.error("Erro ao buscar dados do calendário:", error);
        res.status(500).json({ message: "Erro interno ao buscar dados do calendário.", error: error.message });
    }
});

// Rota corrigida para GET, pois é uma operação de busca de dados, não de atualização.
router.get('/calendario/:id_turma', async (req, res) => {
    const { id_turma } = req.params;

    try {
        const turma = await turmaModel.findDetailsById(id_turma);

        if (!turma) {
            return res.status(404).json({ message: "Turma não encontrada" });
        }

        res.json(turma);

    } catch (error) {
        console.error(`Erro ao buscar detalhes da turma ${id_turma}:`, error);
        res.status(500).json({ message: "Erro ao buscar dados da turma.", error: error.message });
    }
});

module.exports = router;