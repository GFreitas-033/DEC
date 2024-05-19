const db = require('../database/db');

async function readAlunos() {
    try {
        const results = await db.query('SELECT nome FROM alunos');
        return results[0].map(row => row.nome);
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createAlunos(nome) {
    try {
        await db.query('INSERT INTO alunos (nome) VALUES (?)', [nome]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateAlunos(id, novoNome) {
    try {
        await db.query('UPDATE alunos SET nome = ? WHERE id = ?', [novoNome, id]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteAlunos(id) {
    try {
        await db.query('DELETE FROM alunos WHERE id = ?', [id]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    readAlunos,
    createAlunos,
    updateAlunos,
    deleteAlunos
};