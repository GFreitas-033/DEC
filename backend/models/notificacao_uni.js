const db = require('../database/db');

async function readNotificacao_UniPessoa(id_pessoa) {
    try {
        const results = await db.query('SELECT * FROM notificacao_uni WHERE id_pessoa = ?', [id_pessoa]);
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createNotificacao_Uni(id_pessoa, mensagem) {
    try {
        const result = await db.query('INSERT INTO notificacao_uni (id_pessoa, mensagem) VALUES (?,?)', 
                                     [id_pessoa, mensagem]);
        const novoId = result[0].insertId;
        const [novaNotificacao] = await db.query('SELECT * FROM notificacao_uni WHERE id_notificacao_uni = ?', [novoId]);
        return novaNotificacao[0];
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteNotificacao_Uni(id_notificacao_uni) {
    try {
        await db.query('DELETE FROM notificacao_uni WHERE id_notificacao_uni = ?', [id_notificacao_uni]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}



module.exports = {
    readNotificacao_UniPessoa,
    createNotificacao_Uni,
    deleteNotificacao_Uni
};
