const db = require('../database/db');

async function readResponsavelAlunos() {
    try {
        const results = await db.query('SELECT * FROM responsavel_aluno');
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createResponsavelAluno(id_pessoa) {
    try {
        await db.query('INSERT INTO responsavel_aluno (id_pessoa) VALUES (?)', [id_pessoa]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateResponsavelAluno(id_pessoa) {
    try {
        await db.query('UPDATE responsavel_aluno SET id_pessoa = ? WHERE id_pessoa = ?', [id_pessoa, id_pessoa]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteResponsavelAluno(id_pessoa) {
    try {
        await db.query('DELETE FROM responsavel_aluno WHERE id_pessoa = ?', [id_pessoa]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    readResponsavelAlunos,
    createResponsavelAluno,
    updateResponsavelAluno,
    deleteResponsavelAluno
};
