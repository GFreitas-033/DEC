const db = require('../database/db');

async function readResponsavelUnidade() {
    try {
        const results = await db.query('SELECT * FROM responsavel_unidade');
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createResponsavelUnidade(id_pessoa) {
    try {
        await db.query('INSERT INTO responsavel_unidade (id_pessoa) VALUES (?)', [id_pessoa]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateResponsavelUnidade(id_pessoa) {
    try {
        await db.query('UPDATE responsavel_unidade SET id_pessoa = ? WHERE id_pessoa = ?', [id_pessoa, id_pessoa]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteResponsavelUnidade(id_pessoa) {
    try {
        await db.query('DELETE FROM responsavel_unidade WHERE id_pessoa = ?', [id_pessoa]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    readResponsavelUnidade,
    createResponsavelUnidade,
    updateResponsavelUnidade,
    deleteResponsavelUnidade
};
