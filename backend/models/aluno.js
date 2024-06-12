const db = require('../database/db');

async function readAluno() {
    try {
        const results = await db.query('SELECT * FROM aluno');
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createAluno(id_pessoa, destro_canhoto, id_responsavel, dt_inicio) {
    try {
        await db.query('INSERT INTO aluno (id_pessoa, destro_canhoto, id_responsavel,dt_inicio) VALUES (?,?, ?, ?)', 
                      [id_pessoa, destro_canhoto, id_responsavel,dt_inicio]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateAluno(id_pessoa, destro_canhoto, id_responsavel, dt_inicio) {
    try {
        await db.query('UPDATE aluno SET destro_canhoto = ?, id_responsavel = ?, dt_inicio = ? WHERE id_pessoa = ?', 
                      [destro_canhoto, id_responsavel, dt_inicio, id_pessoa]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteAluno(id_pessoa) {
    try {
        await db.query('DELETE FROM aluno WHERE id_pessoa = ?', [id_pessoa]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    readAluno,
    createAluno,
    updateAluno,
    deleteAluno
};
