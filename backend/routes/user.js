// routes/user.js
const express = require("express");
const axios = require("axios"); // Importando axios para realizar requisições HTTP
const router = express.Router();
const alunoController = require("../controllers/alunoController.js");
const enderecoController = require("../controllers/enderecoController.js");
const pessoaController = require("../controllers/pessoaController.js");
const turmaController = require("../controllers/turmaController.js");
const aluno_has_turmaController = require("../controllers/aluno_has_turmaController.js");
const unidadeController = require("../controllers/unidadeController.js");
const responsavel_alunoController = require("../controllers/responsavel_alunoController.js");
const responsavel_unidadeController = require("../controllers/responsavel_unidadeController.js");
const professorController = require("../controllers/professorController.js");

// Definindo as rotas principais para os controladores
router.use("/api/aluno", alunoController);
router.use("/api/endereco", enderecoController);
router.use("/api/pessoa", pessoaController);
router.use("/api/professor", professorController);
router.use("/api/turma", turmaController);
router.use("/api/unidade", unidadeController);
router.use("/api/aluno_has_turma", aluno_has_turmaController);
router.use("/api/responsavel_aluno", responsavel_alunoController);
router.use("/api/responsavel_unidade", responsavel_unidadeController);

router.post("/login", async (req, res) => {
    const { email, senha } = req.body;
    if(req.session.id_pessoa){
        try{
            let id_pessoa = req.session.id_pessoa;
            const response = await axios.get('http://localhost:5000/api/pessoa');
            const dados = response.data;
            const pessoa = dados.find(p => p.id_pessoa === id_pessoa);
            return res.json(pessoa.nome_pessoa);
        }catch(error){
            return res.status(500).json({ message: "Erro ao buscar dados", error: error.message });
        }
    }else{
        try {
            const response = await axios.get('http://localhost:5000/api/pessoa');
            const dados = response.data;
            const pessoa = dados.find(p => p.email_pessoa === email);
            
            if (!pessoa) {
                return res.status(404).json({ message: "Email inválido" });
            }else if (pessoa.senha_pessoa !== senha) {
                return res.status(404).json({ message: "Senha incorreta" });
            }
            // Armazenar o id na sessão
            req.session.id_pessoa = pessoa.id_pessoa;
            return res.json({ nome: pessoa.nome_pessoa });
            
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar dados", error: error.message });
        }
    }
    
});

router.post('/sair',(req,res) => {
    req.session.destroy();
    return res.json(1);
})

module.exports = router;
