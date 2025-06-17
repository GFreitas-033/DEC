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

async function findTurmasByProfessorId(id_professor) {
    try {
        const [rows] = await db.query(`
            SELECT
                t.id_turma,
                u.nome_unidade,
                t.dia_semana,
                t.horario
            FROM turma t
            JOIN unidade u ON t.id_unidade = u.id_unidade
            WHERE t.id_professor = ? AND t.ativado = 1
            ORDER BY t.horario;
        `, [id_professor]);
        return rows;
    } catch (err) {
        console.error('Erro ao buscar turmas do professor:', err);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    readProfessor,
    createProfessor,
    updateProfessor,
    deleteProfessor,
    findTurmasByProfessorId
};
