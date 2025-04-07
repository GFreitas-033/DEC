const db = require('../database/db');

async function readProfessor() {
    try {
        const results = await db.query('SELECT pessoa.nome_pessoa, professor.id_pessoa FROM professor JOIN pessoa ON professor.id_pessoa = pessoa.id_pessoa');
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createProfessor(id_pessoa, caminho_foto) {
    try {
        await db.query('INSERT INTO professor (id_pessoa, caminho_foto) VALUES (?, ?)', 
                      [id_pessoa, caminho_foto]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateProfessor(id_pessoa, caminho_foto) {
    try {
        await db.query('UPDATE professor SET caminho_foto = ? WHERE id_pessoa = ?', 
                      [caminho_foto, id_pessoa]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteProfessor(id_pessoa) {
    try {
        await db.query('DELETE FROM professor WHERE id_pessoa = ?', [id_pessoa]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    readProfessor,
    createProfessor,
    updateProfessor,
    deleteProfessor
};
