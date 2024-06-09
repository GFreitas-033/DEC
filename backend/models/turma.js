const db = require('../database/db');

async function readTurma() {
    try {
        const results = await db.query('SELECT * FROM turma');
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createTurma(qtd_maxima, id_professor, dia_semana, horario) {
    try {
        await db.query('INSERT INTO turma (qtd_maxima, id_professor, dia_semana, horario) VALUES (?, ?, ?, ?)', 
                      [qtd_maxima, id_professor, dia_semana, horario]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateTurma(id_turma, qtd_maxima, id_professor, dia_semana, horario) {
    try {
        await db.query('UPDATE turma SET qtd_maxima = ?, id_professor = ?, dia_semana = ?, horario = ? WHERE id_turma = ?', 
                      [qtd_maxima, id_professor, dia_semana, horario, id_turma]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteTurma(id_turma) {
    try {
        await db.query('DELETE FROM turma WHERE id_turma = ?', [id_turma]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    readTurma,
    createTurma,
    updateTurma,
    deleteTurma
};
