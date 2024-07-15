const db = require('../database/db');

async function readEndereco() {
    try {
        const results = await db.query('SELECT * FROM endereco');
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createEndereco(cep, estado, cidade, bairro, rua, numero) {
    try {
        const result = await db.query('INSERT INTO endereco (cep, estado, cidade, bairro, rua, numero) VALUES (?,?,?,?,?,?)', 
                                     [cep, estado, cidade, bairro, rua, numero]);
        const novoId = result[0].insertId;
        const [novoEndereco] = await db.query('SELECT * FROM endereco WHERE id_endereco = ?', [novoId]);
        return novoEndereco[0];  // Corrigido para retornar o primeiro item do array
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateEndereco(id_endereco, cep, estado, cidade, bairro, rua, numero) {
    try {
        await db.query('UPDATE endereco SET cep = ?, estado = ?, cidade = ?, bairro = ?, rua = ?, numero = ? WHERE id_endereco = ?', 
                      [cep, estado, cidade, bairro, rua, numero, id_endereco]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteEndereco(id_endereco) {
    try {
        await db.query('DELETE FROM endereco WHERE id_endereco = ?', [id_endereco]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    readEndereco,
    createEndereco,
    updateEndereco,
    deleteEndereco
};
