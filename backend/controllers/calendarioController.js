// controllers/calendarioController.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get('/calendario', async (req, res) => {
    let id_pessoa = req.session.id_pessoa;

    try {
        // Verifica se a pessoa é um professor
        const responseProfessor = await axios.get('http://localhost:5000/api/professor');
        const dadosProfessor = responseProfessor.data;
        const professor = dadosProfessor.find(p => p.id_pessoa === id_pessoa);

        let turmas;
        if (professor) {
            // Se for professor, busca as turmas do professor
            const responseTurmas = await axios.get('http://localhost:5000/api/turma');
            const dadosTurmas = responseTurmas.data;
            turmas = dadosTurmas.filter(turma => turma.id_professor === id_pessoa);
        } else {
            // Caso contrário, assume que é um aluno
            const responseTurmasAluno = await axios.get('http://localhost:5000/api/aluno_has_turma');
            const dadosTurmasAluno = responseTurmasAluno.data;
            const turmasAluno = dadosTurmasAluno.filter(p => p.id_aluno === id_pessoa);
            const idTurmas = turmasAluno.map(turma => turma.id_turma);

            const responseMinhasTurmas = await axios.get('http://localhost:5000/api/turma');
            const dadosMinhasTurmas = responseMinhasTurmas.data;
            turmas = dadosMinhasTurmas.filter(turma => idTurmas.includes(turma.id_turma));
        }

        const turmasFiltradas = turmas.map(turma => ({
            dia_semana: turma.dia_semana,
            horario: turma.horario,
            id_unidade: turma.id_unidade
        }));

        const responseUnidades = await axios.get('http://localhost:5000/api/unidade');
        const dadosUnidades = responseUnidades.data;
        const idsUnidades = turmasFiltradas.map(item => item.id_unidade);
        const unidadesFiltradas = dadosUnidades.filter(unidade => idsUnidades.includes(unidade.id_unidade));

        const unidadesMap = unidadesFiltradas.reduce((map, unidade) => {
            map[unidade.id_unidade] = unidade.id_endereco;
            return map;
        }, {});

        const turmasComEndereco = turmasFiltradas.map(turma => ({
            dia_semana: turma.dia_semana,
            horario: turma.horario,
            id_endereco: unidadesMap[turma.id_unidade] || turma.id_unidade
        }));

        const responseEnderecos = await axios.get('http://localhost:5000/api/endereco');
        const dadosEnderecos = responseEnderecos.data;

        const enderecosMap = dadosEnderecos.reduce((map, endereco) => {
            map[endereco.id_endereco] = `${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}`;
            return map;
        }, {});

        const turmasComEnderecoCompleto = turmasComEndereco.map(turma => ({
            dia_semana: turma.dia_semana,
            horario: turma.horario,
            endereco_completo: enderecosMap[turma.id_endereco] || turma.id_endereco
        }));

        res.json(turmasComEnderecoCompleto);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar dados", error: error.message });
    }
});

module.exports = router;