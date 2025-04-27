// controllers/loginController.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const bcrypt = require('bcrypt');
const noti_UniModel = require("../models/notificacao_uni.js");


// routes/auth.js
router.post("/login", async (req, res) => {
    const { usuario, senha } = req.body; 

    if (req.session.id_pessoa) {
        try {
            let id_pessoa = req.session.id_pessoa;
            const response = await axios.get('http://localhost:5000/api/pessoa');
            const dados = response.data;
            const pessoa = dados.find(p => p.id_pessoa === id_pessoa);
            return res.json({ nome: pessoa.nome_pessoa, adm: pessoa.adm });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar dados 1", error: error.message });
        }
    } else {
        try {
            const response = await axios.get('http://localhost:5000/api/pessoa');
            const dados = response.data;
            const usuarioFormatado = usuario.toLowerCase();

            const pessoa = dados.find(p => {
                const partesNome = p.nome_pessoa.toLowerCase().split(" ");
                let nomeUsuario = partesNome[0];

                if (partesNome.length === 2) {
                    nomeUsuario = `${partesNome[0]}.${partesNome[1]}`;
                } else if (partesNome.length >= 3) {
                    nomeUsuario = `${partesNome[0]}.${partesNome[partesNome.length - 1]}`;
                }

                return nomeUsuario === usuarioFormatado;
            });

            if (!pessoa) {
                return res.status(404).json({ message: 1 });
            }

            const verificaSenha = await bcrypt.compare(senha, pessoa.senha_pessoa);

            if (!verificaSenha) {
                return res.status(404).json({ message: 2 });
            }

            req.session.id_pessoa = pessoa.id_pessoa;
            return res.json({ nome: pessoa.nome_pessoa });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar dados 2", error: error.message });
        }
    }
});

router.get('/api/minhas_notificacoes/', async (req, res) => {
    const id_pessoa = req.session.id_pessoa;
    const data = await noti_UniModel.readNotificacao_UniPessoa(id_pessoa);
    res.json(data);
})

router.get('/sair', (req, res) => {
    req.session.destroy();
    res.json({ message: "Sessão encerrada com sucesso" });
});

module.exports = router;
