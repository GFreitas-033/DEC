// routes/user.js
const express = require("express");
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
const loginController = require("../controllers/loginController.js");
const calendarioController = require("../controllers/calendarioController.js");
const admController = require("../controllers/admController.js");
const chamadaController = require("../controllers/chamadaController.js");
const dashboardController = require("../controllers/dashboardController.js");
const { verifyToken, isAdmin } = require("../middleware/auth.js");

// --- Public Routes ---
router.use("/", loginController);
router.use('/api/turma',turmaController);
router.use('/api/unidade',unidadeController);
router.use('/api/pessoa', pessoaController);
router.use('/api/aluno', alunoController);
router.use('/api/aluno_has_turma', aluno_has_turmaController);
router.use('/api/responsavel_aluno', responsavel_alunoController);
router.use('/api/endereco',enderecoController)


// --- Protected Routes ---
const userRoutes = express.Router();
userRoutes.use(verifyToken);

// Controllers that are fully protected
userRoutes.use("/api/professor", professorController);
userRoutes.use("/api/responsavel_unidade", responsavel_unidadeController);
userRoutes.use("/api/chamada", chamadaController);
userRoutes.use("/", calendarioController);

userRoutes.get('/listaralunos/:idturma', verifyToken, async (req, res) => {
    const id_turma = parseInt(req.params.idturma);
    try {
        const responseTurmas_Alunos = await require("../models/aluno_has_turma.js").readAlunoHasTurma();
        const alunosTurma = responseTurmas_Alunos
            .filter(dado => dado.id_turma === id_turma)
            .map(dado => dado.id_aluno);

        const dadosPessoa = await require("../models/pessoa.js").readPessoa();
        const alunosDetalhados = dadosPessoa
            .filter(pessoa => alunosTurma.includes(pessoa.id_pessoa))
            .map(pessoa => ({
                id_pessoa: pessoa.id_pessoa,
                nome_pessoa: pessoa.nome_pessoa
            }));

        res.json(alunosDetalhados);

    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar dados da turma", error: error.message });
    }
});

userRoutes.get('/listartodosalunos', verifyToken, isAdmin, async (req, res) => {
    try {
        const dadosAlunos = await require("../models/aluno.js").readAluno();
        const idsAlunos = dadosAlunos.map(aluno => aluno.id_pessoa);

        const dadosPessoa = await require("../models/pessoa.js").readPessoa();
        const alunos = dadosPessoa
            .filter(pessoa => idsAlunos.includes(pessoa.id_pessoa))
            .map(pessoa => ({
                id_aluno: pessoa.id_pessoa,
                nome_aluno: pessoa.nome_pessoa
            }));

        res.json(alunos);

    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar todos os alunos", error: error.message });
    }
});

router.use(userRoutes);


// --- Admin Routes ---
const adminRoutes = express.Router();
adminRoutes.use(verifyToken);
adminRoutes.use(isAdmin);
adminRoutes.use("/adm", admController);
adminRoutes.get('/api/dashboard', dashboardController.getDashboardData);
adminRoutes.get('/api/dashboard/comparativo', dashboardController.getComparativoData);
router.use(adminRoutes);


// --- Other Specific Routes ---


module.exports = router;
