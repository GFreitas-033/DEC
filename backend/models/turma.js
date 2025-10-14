const db = require('../database/db');

async function readTurma() {
    try {
        const results = await db.query(`SELECT * FROM turma WHERE ativado=1 ORDER BY CASE WHEN dia_semana = 'domingo' THEN 1 WHEN dia_semana = 'segunda' THEN 2 WHEN dia_semana = 'terça' THEN 3 WHEN dia_semana = 'quarta' THEN 4 WHEN dia_semana = 'quinta' THEN 5 WHEN dia_semana = 'sexta' THEN 6 WHEN dia_semana = 'sábado' THEN 7 END`
        );
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function readTurmaPadrao() {
    try {
        const results = await db.query(`SELECT id_turma,id_unidade,id_professor,nome_turma FROM turma WHERE ativado=1`);
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createTurma(qtd_maxima, id_professor, dia_semana, horario, horario_final, id_unidade, nome_turma) {
    try {
        await db.query('INSERT INTO turma (qtd_maxima, id_professor, dia_semana, horario, horario_final, id_unidade, nome_turma) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [qtd_maxima, id_professor, dia_semana, horario, horario_final, id_unidade, nome_turma]);
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updateTurma(id_turma, qtd_maxima, id_professor, dia_semana, horario, horario_final, id_unidade, nome_turma) {
    try {
        await db.query('UPDATE turma SET qtd_maxima = ?, id_professor = ?, dia_semana = ?, horario = ?, horario_final = ?, id_unidade = ?, nome_turma = ? WHERE id_turma = ?',
            [qtd_maxima, id_professor, dia_semana, horario, horario_final, id_unidade, nome_turma, id_turma]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deleteTurma(id_turma) {
    try {
        await db.query('UPDATE turma SET ativado = 0 WHERE id_turma = ?', [id_turma]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function readTurmaFormatada() {
    try {
        const results = await db.query(`
            SELECT 
                id_turma, 
                qtd_maxima, 
                dia_semana, 
                TIME_FORMAT(horario, '%H:%i') as horario, 
                TIME_FORMAT(horario_final, '%H:%i') as horario_final,
                id_unidade, 
                id_professor, 
                nome_turma 
            FROM turma
            WHERE t.ativado = 1 
            ORDER BY 
                CASE 
                    WHEN dia_semana = 'domingo' THEN 1 
                    WHEN dia_semana = 'segunda' THEN 2 
                    WHEN dia_semana = 'terça' THEN 3 
                    WHEN dia_semana = 'quarta' THEN 4 
                    WHEN dia_semana = 'quinta' THEN 5 
                    WHEN dia_semana = 'sexta' THEN 6 
                    WHEN dia_semana = 'sábado' THEN 7 
                END
        `);

        return results[0].map(turma => {
            let dia = turma.dia_semana.toLowerCase();

            // Formata o dia da semana corretamente
            if (["segunda", "terça", "quarta", "quinta", "sexta"].includes(dia)) {
                dia = dia.charAt(0).toUpperCase() + dia.slice(1) + "-Feira";
            } else {
                dia = dia.charAt(0).toUpperCase() + dia.slice(1);
            }

            return {
                ...turma,
                nome_formatado: `${dia} | ${turma.nome_turma} | ${turma.horario} - ${turma.horario_final}`
            };
        });
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function findAllWithDetails() {
    try {
        const [rows] = await db.query(`
            SELECT
                t.dia_semana,
                t.horario,
                t.id_turma,
                t.nome_turma,
                CONCAT(e.rua, ', ', e.numero, ', ', e.bairro, ', ', e.cidade, ', ', e.estado) AS endereco_completo
            FROM turma t
            JOIN unidade u ON t.id_unidade = u.id_unidade
            JOIN endereco e ON u.id_endereco = e.id_endereco
            WHERE t.ativado = 1
            ORDER BY 
                CASE 
                    WHEN dia_semana = 'domingo' THEN 1 
                    WHEN dia_semana = 'segunda' THEN 2 
                    WHEN dia_semana = 'terça' THEN 3 
                    WHEN dia_semana = 'quarta' THEN 4 
                    WHEN dia_semana = 'quinta' THEN 5 
                    WHEN dia_semana = 'sexta' THEN 6 
                    WHEN dia_semana = 'sábado' THEN 7 
                END, horario
        `);
        return rows;
    } catch (err) {
        console.error('Erro ao buscar todas as turmas com detalhes:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function findByProfessorWithDetails(id_professor) {
    try {
        const [rows] = await db.query(`
            SELECT
                t.dia_semana,
                t.horario,
                t.id_turma,
                t.nome_turma,
                CONCAT(e.rua, ', ', e.numero, ', ', e.bairro, ', ', e.cidade, ', ', e.estado) AS endereco_completo
            FROM turma t
            JOIN unidade u ON t.id_unidade = u.id_unidade
            JOIN endereco e ON u.id_endereco = e.id_endereco
            WHERE t.id_professor = ? and t.ativado = 1
            ORDER BY 
                CASE 
                    WHEN dia_semana = 'domingo' THEN 1 
                    WHEN dia_semana = 'segunda' THEN 2 
                    WHEN dia_semana = 'terça' THEN 3 
                    WHEN dia_semana = 'quarta' THEN 4 
                    WHEN dia_semana = 'quinta' THEN 5 
                    WHEN dia_semana = 'sexta' THEN 6 
                    WHEN dia_semana = 'sábado' THEN 7 
                END, horario
        `, [id_professor]);
        return rows;
    } catch (err) {
        console.error('Erro ao buscar turmas do professor com detalhes:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function findByAlunoWithDetails(id_aluno) {
    try {
        const [rows] = await db.query(`
            SELECT
                t.dia_semana,
                t.horario,
                t.id_turma,
                t.nome_turma,
                CONCAT(e.rua, ', ', e.numero, ', ', e.bairro, ', ', e.cidade, ', ', e.estado) AS endereco_completo
            FROM turma t
            JOIN aluno_has_turma aht ON t.id_turma = aht.id_turma
            JOIN unidade u ON t.id_unidade = u.id_unidade
            JOIN endereco e ON u.id_endereco = e.id_endereco
            WHERE aht.id_aluno = ? and t.ativado = 1
            ORDER BY 
                CASE 
                    WHEN dia_semana = 'domingo' THEN 1 
                    WHEN dia_semana = 'segunda' THEN 2 
                    WHEN dia_semana = 'terça' THEN 3 
                    WHEN dia_semana = 'quarta' THEN 4 
                    WHEN dia_semana = 'quinta' THEN 5 
                    WHEN dia_semana = 'sexta' THEN 6 
                    WHEN dia_semana = 'sábado' THEN 7 
                END, horario
        `, [id_aluno]);
        return rows;
    } catch (err) {
        console.error('Erro ao buscar turmas do aluno com detalhes:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function findDetailsById(id_turma) {
    try {
        const [rows] = await db.query(`
            SELECT
                t.horario,
                t.id_turma,
                t.nome_turma,
                CONCAT(e.rua, ', ', e.numero, ', ', e.bairro, ', ', e.cidade, ', ', e.estado) AS endereco_completo
            FROM turma t
            JOIN unidade u ON t.id_unidade = u.id_unidade
            JOIN endereco e ON u.id_endereco = e.id_endereco
            WHERE t.id_turma = ?
        `, [id_turma]);
        return rows[0]; // Retorna o primeiro objeto encontrado ou undefined
    } catch (err) {
        console.error('Erro ao buscar detalhes da turma:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function readTurmaPadraoCompleta() {
    try {
        const [rows] = await db.query(`
            SELECT
            t.id_turma,
            CONCAT(
                t.nome_turma,
                " - ",
                t.horario,
                " - ",
                CONCAT(UPPER(LEFT(t.dia_semana, 1)), SUBSTRING(t.dia_semana, 2))
            ) AS nome_turma
            FROM
                turma t
            WHERE t.ativado = 1;
        `);
        return rows; // Retorna o primeiro objeto encontrado ou undefined
    } catch (err) {
        console.error('Erro ao buscar detalhes da turma:', err);
        throw new Error('Erro interno do servidor');
    }
}


module.exports = {
    readTurma,
    createTurma,
    updateTurma,
    deleteTurma,
    readTurmaFormatada,
    readTurmaPadrao,
    findAllWithDetails,
    findByAlunoWithDetails,
    findByProfessorWithDetails,
    findDetailsById,
    readTurmaPadraoCompleta
};