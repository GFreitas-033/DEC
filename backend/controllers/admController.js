// controllers/admController.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get('/aluno', async (req, res) => {
    try {
        const responseAluno = await axios.get('http://localhost:5000/api/aluno');
        const dadosAluno = responseAluno.data;

        const responsePessoa = await axios.get('http://localhost:5000/api/pessoa');
        const dadosPessoa = responsePessoa.data;

        const idsAluno = new Set(dadosAluno.map(aluno => aluno.id_pessoa));

        const pessoasFiltradas = dadosPessoa.filter(pessoa => idsAluno.has(pessoa.id_pessoa));

        res.json(pessoasFiltradas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

router.get('/excluiraluno/:id_aluno', async (req, res) => {
    const id_aluno = parseInt(req.params.id_aluno);
    try {
        await axios.delete(`http://localhost:5000/api/aluno_has_turma/${id_aluno}`);
        await axios.delete(`http://localhost:5000/api/aluno/${id_aluno}`);
        // await axios.delete(`http://localhost:5000/api/pessoa/${id_aluno}`);
        res.status(200).send('Registro excluído com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados.');
    }
});

module.exports = router;
