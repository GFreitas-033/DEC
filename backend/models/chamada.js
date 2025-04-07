const db = require('../database/db');

async function buscaChamada(id_turma, data) {
    try {
        const [rows] = await db.execute('CALL sp_chamada_com_alunos(?, ?);', [id_turma, data]);

        const parsedRows = rows[0].map(entry => ({
            ...entry,
            status_c: entry.status_c ? parseInt(Buffer.from(entry.status_c).toString()) : null,
            presenca: entry.presenca ? parseInt(Buffer.from(entry.presenca).toString()) : null,
        }));

        return parsedRows;
    } catch (err) {
        throw new Error('Erro interno do servidor');
    }
}

async function enviarChamada(id_chamada, status_c, alunos, observacao) {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        await conn.execute(
            'UPDATE chamada SET status_c = ?, observacao = ? WHERE id_chamada = ?',
            [status_c, observacao, id_chamada] // ordem correta dos parâmetros
          );

        for (const aluno of alunos) {
            await conn.execute(
                'INSERT INTO chamada_has_alunos (id_chamada, id_aluno, presenca) VALUES (?, ?, ?)',
                [id_chamada, aluno.id_aluno, aluno.presenca]
            );
        }

        await conn.commit();
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}

module.exports = {
    buscaChamada,
    enviarChamada
};
