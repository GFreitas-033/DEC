const db = require('../database/db');

async function readAlunoHasTurma() {
    try {
        const results = await db.query('SELECT * FROM aluno_has_turma');
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createAlunoHasTurma(id_aluno, id_turma) {
    try {
        await db.query('INSERT INTO aluno_has_turma (id_aluno, id_turma) VALUES (?, ?)', 
                      [id_aluno, id_turma]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateAlunoHasTurma(id_aluno, id_turma) {
    try {
        await db.query('UPDATE aluno_has_turma SET id_turma = ? WHERE id_aluno = ?', 
                      [id_turma, id_aluno]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteAlunoHasTurma(id_aluno) {
    try {
        await db.query('DELETE FROM aluno_has_turma WHERE id_aluno = ?', 
                      [id_aluno]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    readAlunoHasTurma,
    createAlunoHasTurma,
    updateAlunoHasTurma,
    deleteAlunoHasTurma
};
