// controllers/loginController.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const bcrypt = require('bcrypt');

router.post("/login", async (req, res) => {
    const { usuario, senha } = req.body; 
    if (req.session.id_pessoa) {
        try {
            let id_pessoa = req.session.id_pessoa;
            const response = await axios.get('http://localhost:5000/api/pessoa');
            const dados = response.data;
            const pessoa = dados.find(p => p.id_pessoa === id_pessoa);
            return res.json(pessoa.nome_pessoa);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar dados 1", error: error.message });
        }
    } else {
        try {
            const response = await axios.get('http://localhost:5000/api/pessoa');
            const dados = response.data;
            const usuarioFormatado = usuario.toLowerCase();
            const pessoa = dados.find(p => {
                const nomeCompleto = p.nome_pessoa.toLowerCase().split(" ");
                const nomeUsuario = nomeCompleto.length > 1 ? `${nomeCompleto[0]}.${nomeCompleto[1]}` : nomeCompleto[0];
                return nomeUsuario === usuarioFormatado;
            });

            if (!pessoa) {
                return res.status(404).json({ message: "Usuário inválido" });
            }

            const verificaSenha = await bcrypt.compare(senha, pessoa.senha_pessoa);

            if (!verificaSenha) {
                return res.status(404).json({ message: "Senha incorreta" });
            }

            req.session.id_pessoa = pessoa.id_pessoa;
            return res.json({ nome: pessoa.nome_pessoa });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar dados 2", error: error.message });
        }
    }
});

router.get('/sair', (req, res) => {
    req.session.destroy();
    res.json({ message: "Sessão encerrada com sucesso" });
});

module.exports = router;
