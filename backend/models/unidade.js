const db = require('../database/db');

async function readUnidade() {
    try {
        const results = await db.query('SELECT * FROM unidade');
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createUnidade(nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, id_responsavel_unidade) {
    try {
        await db.query('INSERT INTO unidade (nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, id_responsavel_unidade) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                      [nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, id_responsavel_unidade]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateUnidade(id_unidade, nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco) {
    try {
        await db.query('UPDATE unidade SET nome_unidade = ?, cnpj_unidade = ?, telefone_unidade = ?, email_unidade = ?, mais_contatos = ?, id_endereco = ? WHERE id_unidade = ?', 
                      [nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, id_unidade]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteUnidade(id_unidade) {
    try {
        await db.query('DELETE FROM unidade WHERE id_unidade = ?', [id_unidade]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    readUnidade,
    createUnidade,
    updateUnidade,
    deleteUnidade
};
