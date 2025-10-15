// DEC-Clone/backend/middleware/auth.js
const pessoaModel = require("../models/pessoa.js");

async function verifyToken(req, res, next) {
    if (!req.session.id_pessoa) {
        return res.status(401).json({ message: 'Não autorizado' });
    }
    next();
}

async function isAdmin(req, res, next) {
    try {
        const pessoa = await pessoaModel.findById(req.session.id_pessoa);

        if (pessoa && pessoa.adm) {
            next();
        } else {
            return res.status(403).json({ message: 'Acesso negado' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao verificar permissões de administrador', error: error.message });
    }
}

module.exports = { verifyToken, isAdmin };
