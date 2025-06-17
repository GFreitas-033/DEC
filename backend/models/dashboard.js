// models/dashboard.js
const db = require('../database/db');

async function getDashboardData({ cidade, unidade }) {
    const connection = await db.getConnection();
    try {
        // --- Estrutura Base das Queries ---
        const baseQuery = `
            FROM aluno a
            JOIN pessoa p ON a.id_pessoa = p.id_pessoa
            JOIN endereco e ON p.id_endereco = e.id_endereco
            LEFT JOIN aluno_has_turma aht ON p.id_pessoa = aht.id_aluno
            LEFT JOIN turma t ON aht.id_turma = t.id_turma
            LEFT JOIN unidade u ON t.id_unidade = u.id_unidade
        `;

        // --- Lógica de Filtro Dinâmico ---
        let whereClauses = ['a.ativado = 1'];
        let params = [];
        if (cidade && cidade !== 'Todas as Cidades') {
            whereClauses.push('e.cidade = ?');
            params.push(cidade);
        }
        if (unidade) {
            whereClauses.push('u.nome_unidade = ?');
            params.push(unidade);
        }
        const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        // --- Query para Análise Geral ---
        let geralWhereClauses = [];
        let geralParamsForQuery = [];
        if (cidade && cidade !== 'Todas as Cidades') {
            geralWhereClauses.push('e.cidade = ?');
            geralParamsForQuery.push(cidade);
        }
        if (unidade) {
            geralWhereClauses.push('u.nome_unidade = ?');
            geralParamsForQuery.push(unidade);
        }
        const geralWhereString = geralWhereClauses.length > 0 ? `WHERE ${geralWhereClauses.join(' AND ')}` : '';
        
        // ***** INÍCIO DA CORREÇÃO *****
        const finalGeralQuery = `
            SELECT
                COUNT(DISTINCT p.id_pessoa) AS totalAlunos,
                COUNT(DISTINCT CASE WHEN a.ativado = 1 THEN p.id_pessoa ELSE NULL END) AS ativos,
                COUNT(DISTINCT CASE WHEN a.ativado = 0 THEN p.id_pessoa ELSE NULL END) AS inativos,
                COUNT(DISTINCT CASE WHEN a.tipo_aluno = 'Pagante' AND a.ativado = 1 THEN p.id_pessoa ELSE NULL END) AS pagantes,
                COUNT(DISTINCT CASE WHEN a.tipo_aluno != 'Pagante' AND a.ativado = 1 THEN p.id_pessoa ELSE NULL END) AS naoPagantes
            ${baseQuery}
            ${geralWhereString}
        `;
        // ***** FIM DA CORREÇÃO *****

        // --- Definição de Todas as Queries ---
        const generoQuery = `SELECT p.genero, COUNT(DISTINCT p.id_pessoa) AS value ${baseQuery} ${whereString} GROUP BY p.genero`;
        const destroCanhotoQuery = `SELECT a.destro_canhoto, COUNT(DISTINCT a.id_pessoa) AS value ${baseQuery} ${whereString} GROUP BY a.destro_canhoto`;
        const anoNascQuery = `SELECT YEAR(p.dt_nasc_pessoa) AS ano, COUNT(DISTINCT p.id_pessoa) AS quantidade ${baseQuery} ${whereString} GROUP BY YEAR(p.dt_nasc_pessoa) ORDER BY ano DESC`;
        const alunosCidadeQuery = `SELECT e.cidade, COUNT(DISTINCT p.id_pessoa) AS alunos FROM aluno a JOIN pessoa p ON a.id_pessoa = p.id_pessoa JOIN endereco e ON p.id_endereco = e.id_endereco WHERE a.ativado = 1 GROUP BY e.cidade ORDER BY alunos DESC`;
        const cidadesListQuery = `SELECT DISTINCT e.cidade FROM endereco e JOIN pessoa p ON e.id_endereco = p.id_endereco JOIN aluno a ON p.id_pessoa = a.id_pessoa WHERE a.ativado = 1 ORDER BY e.cidade;`;
        let unidadesListQuery = `SELECT DISTINCT u.nome_unidade as unidade FROM unidade u JOIN endereco e ON u.id_endereco = e.id_endereco WHERE e.cidade = ? ORDER BY u.nome_unidade;`;
        
        // --- Execução Paralela das Queries ---
        const [
            [geralResult], generoResult, destroCanhotoResult, anoNascResult,
            alunosCidadeResult, cidadesListResult, unidadesListResult
        ] = await Promise.all([
            connection.query(finalGeralQuery, geralParamsForQuery),
            connection.query(generoQuery, params),
            connection.query(destroCanhotoQuery, params),
            connection.query(anoNascQuery, params),
            connection.query(alunosCidadeQuery),
            connection.query(cidadesListQuery),
            (cidade && cidade !== 'Todas as Cidades') ? connection.query(unidadesListQuery, [cidade]) : Promise.resolve([[]])
        ]);

        // --- Formatação do Objeto de Resposta ---
        return {
            geral: {
                totalAlunos: geralResult[0].totalAlunos || 0,
                ativos: geralResult[0].ativos || 0,
                inativos: geralResult[0].inativos || 0,
                pagantes: geralResult[0].pagantes || 0,
                naoPagantes: geralResult[0].naoPagantes || 0,
            },
            graficos: {
                genero: {
                    data: [ { name: "Meninos", value: generoResult[0].find(g => g.genero === 'm')?.value || 0 }, { name: "Meninas", value: generoResult[0].find(g => g.genero === 'f')?.value || 0 } ],
                    cores: ["#4867FF", "#FF4AE7"]
                },
                destroCanhoto: {
                    data: [ { name: "Destro", value: destroCanhotoResult[0].find(d => d.destro_canhoto === 'd')?.value || 0 }, { name: "Canhoto", value: destroCanhotoResult[0].find(d => d.destro_canhoto === 'c')?.value || 0 } ],
                    cores: ["#42FF42", "#FF4545"]
                }
            },
            anoNascimento: { data: anoNascResult[0] },
            cidadeUnidade: {
                cidades: ['Todas as Cidades', ...cidadesListResult[0].map(c => c.cidade)],
                unidades: unidadesListResult[0].map(u => u.unidade)
            },
            alunosPorCidade: {
                data: alunosCidadeResult[0].map(item => ({ cidade: item.cidade, alunos: item.alunos })),
                cores: ['#FBD034', '#34A0F2', '#F27457', '#8AD1C2', '#A45EE5', '#50C878']
            }
        };
    } catch (error) {
        console.error('Erro ao obter dados do dashboard:', error);
        throw new Error('Erro interno do servidor');
    } finally {
        connection.release();
    }
}

// A função getComparativoData permanece a mesma...
async function getComparativoData({ data1, data2, cidade, unidade }) {
    const connection = await db.getConnection();
    try {
        const createQuery = (date) => {
            let baseQuery = `FROM aluno a JOIN pessoa p ON a.id_pessoa = p.id_pessoa JOIN endereco e ON p.id_endereco = e.id_endereco LEFT JOIN aluno_has_turma aht ON p.id_pessoa = aht.id_aluno LEFT JOIN turma t ON aht.id_turma = t.id_turma LEFT JOIN unidade u ON t.id_unidade = u.id_unidade`;
            let whereClauses = ['a.dt_inicio <= ?'];
            let params = [date];

            if (cidade && cidade !== 'Todas as Cidades') {
                whereClauses.push('e.cidade = ?');
                params.push(cidade);
            }
            if (unidade) {
                whereClauses.push('u.nome_unidade = ?');
                params.push(unidade);
            }
            return {
                query: `SELECT COUNT(DISTINCT p.id_pessoa) as total ${baseQuery} WHERE ${whereClauses.join(' AND ')}`,
                params: params
            };
        };

        const query1 = createQuery(data1);
        const query2 = createQuery(data2);

        const [[result1], [result2]] = await Promise.all([
            connection.query(query1.query, query1.params),
            connection.query(query2.query, query2.params)
        ]);
        
        return {
            alunosData1: result1[0].total || 0,
            alunosData2: result2[0].total || 0
        };
    } catch (error) {
        console.error('Erro ao obter dados comparativos:', error);
        throw new Error('Erro interno do servidor');
    } finally {
        connection.release();
    }
}

module.exports = { getDashboardData, getComparativoData };