const db = require('../database/db');

async function readAluno() {
    try {
        const results = await db.query('SELECT * FROM aluno WHERE ativado=1');
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function readFilterAluno() {
    try {
        const results = await db.query('SELECT * FROM my_alunos');
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createAluno(id_pessoa, destro_canhoto, id_responsavel, dt_inicio, tipo_plano, dia_pagamento, tipo_aluno, id_responsavel2) {
    try {
        await db.query('INSERT INTO aluno (id_pessoa, destro_canhoto, id_responsavel,dt_inicio, tipo_plano, dia_pagamento, tipo_aluno, id_responsavel2) VALUES (?,?, ?, ?, ?, ?, ?, ?)', 
                      [id_pessoa, destro_canhoto, id_responsavel,dt_inicio, tipo_plano, dia_pagamento, tipo_aluno, id_responsavel2]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateAluno(id_pessoa, destro_canhoto, id_responsavel, tipo_plano, dia_pagamento, tipo_aluno, id_responsavel2) {
    try {
        await db.query('UPDATE aluno SET destro_canhoto = ?, id_responsavel = ?, tipo_plano = ?, dia_pagamento = ?, tipo_aluno = ?, id_responsavel2 = ? WHERE id_pessoa = ?',
            [destro_canhoto, id_responsavel, tipo_plano, dia_pagamento, tipo_aluno, id_responsavel2, id_pessoa]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteAluno(id_pessoa) {
    try {
        await db.query('UPDATE aluno SET ativado = 0 WHERE id_pessoa = ?', [id_pessoa]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function allDataAluno(id_aluno) {
    try {
        const query = `
            SELECT * from vw_aluno_responsavel WHERE id_aluno = ?
        `;
        const [rows] = await db.execute(query, [id_aluno]);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar dados completos do aluno:', error);
        throw new Error('Erro interno do servidor');
    }
}

async function getTurmas(id_aluno) {
    try {
        const query = `
            SELECT 
            t.id_turma, 
            CONCAT(
                t.nome_turma, " - ", 
                t.horario, " - ", 
                CONCAT(UPPER(LEFT(t.dia_semana, 1)), LOWER(SUBSTRING(t.dia_semana, 2)))
            ) AS nome_turma
            FROM turma t
            JOIN aluno_has_turma aht 
            ON aht.id_turma = t.id_turma
            WHERE aht.id_aluno = ?;
        `;
        const [rows] = await db.execute(query, [id_aluno]);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar as turmas do aluno:', error);
        throw new Error('Erro interno do servidor');
    }
}

async function getResponsaveis(id_aluno) {
    try {
        const query = `
            SELECT p.id_pessoa,p.nome_pessoa
            FROM pessoa p
            JOIN aluno a
            WHERE (a.id_responsavel = p.id_pessoa OR a.id_responsavel2 = p.id_pessoa) AND a.id_pessoa = ?;
        `;
        const [rows] = await db.execute(query, [id_aluno]);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar as turmas do aluno:', error);
        throw new Error('Erro interno do servidor');
    }
}


module.exports = {
    readAluno,
    createAluno,
    updateAluno,
    deleteAluno,
    allDataAluno,
    readFilterAluno,
    getTurmas,
    getResponsaveis
};
