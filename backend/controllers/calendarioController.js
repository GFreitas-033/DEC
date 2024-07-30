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

        const responseAdm = await axios.get('http://localhost:5000/api/pessoa');
        const dadosAdm = responseAdm.data;
        let adm = dadosAdm.find(p => p.id_pessoa === id_pessoa);
        adm =  adm.adm;

        let turmas;
        if (professor) {
            // Se for professor, busca as turmas do professor
            const responseTurmas = await axios.get('http://localhost:5000/api/turma');
            const dadosTurmas = responseTurmas.data;
            turmas = dadosTurmas.filter(turma => turma.id_professor === id_pessoa);
        }else if(adm==1){
            const responseTurmas = await axios.get('http://localhost:5000/api/turma');
            turmas = responseTurmas.data;
        }else {
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
            id_unidade: turma.id_unidade,
            id_turma: turma.id_turma,
            nome_turma: turma.nome_turma // Adiciona o campo nome_turma
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
            id_turma: turma.id_turma,
            id_endereco: unidadesMap[turma.id_unidade] || turma.id_unidade,
            nome_turma: turma.nome_turma // Mantém o campo nome_turma
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
            id_turma: turma.id_turma,
            endereco_completo: enderecosMap[turma.id_endereco] || turma.id_endereco,
            nome_turma: turma.nome_turma
        }));

        res.json(turmasComEnderecoCompleto);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar dados", error: error.message });
    }
});

router.put('/calendario/:id_turma', async (req, res) => {
    const id_turma = parseInt(req.params.id_turma);

    try {
        // Obter turma pelo id_turma
        const responseTurmas = await axios.get('http://localhost:5000/api/turma');
        const turma = responseTurmas.data.find(t => t.id_turma === id_turma);

        if (!turma) {
            return res.status(404).json({ message: "Turma não encontrada" });
        }

        // Obter unidade pelo id_unidade da turma
        const responseUnidades = await axios.get('http://localhost:5000/api/unidade');
        const unidade = responseUnidades.data.find(u => u.id_unidade === turma.id_unidade);

        if (!unidade) {
            return res.status(404).json({ message: "Unidade não encontrada" });
        }

        // Obter endereço pelo id_endereco da unidade
        const responseEnderecos = await axios.get('http://localhost:5000/api/endereco');
        const endereco = responseEnderecos.data.find(e => e.id_endereco === unidade.id_endereco);

        if (!endereco) {
            return res.status(404).json({ message: "Endereço não encontrado" });
        }

        // Montar a string completa do endereço
        const enderecoCompleto = `${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}`;

        // Retornar a resposta no formato esperado
        const resultado = {
            horario: turma.horario,
            id_turma: turma.id_turma,
            endereco_completo: enderecoCompleto,
            nome_turma: turma.nome_turma
        };

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar dados", error: error.message });
    }
});


module.exports = router;
