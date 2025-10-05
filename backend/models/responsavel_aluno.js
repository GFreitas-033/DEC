const db = require('../database/db');

async function readResponsavelAluno() {
    try {
        const results = await db.query('SELECT p.id_pessoa, p.nome_pessoa FROM pessoa p JOIN responsavel_aluno ra WHERE ra.id_pessoa = p.id_pessoa');
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

async function getResponsavelByPessoaId(id_pessoa) {
    try {
        const [result] = await db.query('SELECT id_pessoa FROM responsavel_aluno WHERE id_pessoa = ?', [id_pessoa]);
        return result.length > 0 ? result[0] : null;
    } catch (err) {
        console.error('Erro ao buscar responsável:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function allDataResponsavel(id_pessoa) {
    try {
        const [result] = await db.query('SELECT p.id_pessoa, p.nome_pessoa, p.email_pessoa, p.cpf_pessoa, p.rg_pessoa, p.telefone_pessoa, p.genero FROM pessoa p WHERE p.id_pessoa = ?', [id_pessoa]);
        return result.length > 0 ? result[0] : null;
    } catch (err) {
        console.error('Erro ao buscar responsável:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function getAlunosResponsavel(id_pessoa) {
    try {
        const results = await db.query('SELECT p.id_pessoa, p.nome_pessoa FROM pessoa p JOIN aluno a where a.id_pessoa = p.id_pessoa AND (a.id_responsavel = ? OR a.id_responsavel2 = ?)', [id_pessoa, id_pessoa]);
        return results[0];
    } catch (err) {
        console.error('Erro ao buscar responsável:', err);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    readResponsavelAluno,
    createResponsavelAluno,
    updateResponsavelAluno,
    deleteResponsavelAluno,
    getResponsavelByPessoaId, 
    allDataResponsavel,
    getAlunosResponsavel
};
