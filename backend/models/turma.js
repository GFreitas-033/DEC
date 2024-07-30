const db = require('../database/db');

async function readTurma() {
    try {
        const results = await db.query(`SELECT * FROM turma ORDER BY CASE WHEN dia_semana = 'domingo' THEN 1 WHEN dia_semana = 'segunda' THEN 2 WHEN dia_semana = 'terça' THEN 3 WHEN dia_semana = 'quarta' THEN 4 WHEN dia_semana = 'quinta' THEN 5 WHEN dia_semana = 'sexta' THEN 6 WHEN dia_semana = 'sábado' THEN 7 END`
        );
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createTurma(qtd_maxima, id_professor, dia_semana, horario, id_unidade, nome_turma) {
    try {
        await db.query('INSERT INTO turma (qtd_maxima, id_professor, dia_semana, horario, id_unidade, nome_turma) VALUES (?, ?, ?, ?, ?, ?)', 
                      [qtd_maxima, id_professor, dia_semana, horario, id_unidade, nome_turma]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateTurma(id_turma, qtd_maxima, id_professor, dia_semana, horario, id_unidade, nome_turma) {
    try {
        await db.query('UPDATE turma SET qtd_maxima = ?, id_professor = ?, dia_semana = ?, horario = ?, id_unidade = ?, nome_turma = ? WHERE id_turma = ?', 
                      [qtd_maxima, id_professor, dia_semana, horario,id_unidade, nome_turma, id_turma]);
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
