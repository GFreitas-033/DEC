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

async function updateAluno(id_pessoa, destro_canhoto, id_responsavel,tipo_plano, dia_pagamento, tipo_aluno, id_responsavel2) {
    try {
        await db.query('UPDATE aluno SET destro_canhoto = ?, id_responsavel = ?, tipo_plano = ?, dia_pagamento = ?, tipo_aluno = ?, id_responsavel2 = ? WHERE id_pessoa = ?', 
                      [destro_canhoto, id_responsavel, id_pessoa, tipo_plano, dia_pagamento, tipo_aluno, id_responsavel2]);
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

async function allDataAluno(id_aluno) {
    try{
        const query = `
            SELECT * from vw_aluno_responsavel WHERE id_aluno = ?
        `;

        const [rows] = await db.execute(query, [id_aluno]);
        return rows;
    }catch{
        throw new Error('Erro inteno do servidor');
    }
}

module.exports = {
    readAluno,
    createAluno,
    updateAluno,
    deleteAluno,
    allDataAluno,
    readFilterAluno
};
