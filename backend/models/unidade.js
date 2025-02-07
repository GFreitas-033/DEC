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

async function createUnidade(nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, tipo) {
    try {
        await db.query('INSERT INTO unidade (nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                      [nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, tipo]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateUnidade(id_unidade, nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, tipo) {
    try {
        await db.query('UPDATE unidade SET nome_unidade = ?, cnpj_unidade = ?, telefone_unidade = ?, email_unidade = ?, mais_contatos = ?, id_endereco = ?, tipo = ? WHERE id_unidade = ?', 
                      [nome_unidade, cnpj_unidade, telefone_unidade, email_unidade, mais_contatos, id_endereco, id_unidade, tipo]);
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

const findUnidadesByCidade = async (cidade) => {
    const query = `
        SELECT u.*
        FROM unidade u
        JOIN endereco e ON u.id_endereco = e.id_endereco
        WHERE e.cidade = ?;
    `;

    const [rows] = await db.execute(query, [cidade]);
    return rows;
};

module.exports = {
    readUnidade,
    createUnidade,
    updateUnidade,
    deleteUnidade,
    findUnidadesByCidade
};
