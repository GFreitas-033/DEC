const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dourado',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();


async function testConnection() {
    try {
        const connection = await promisePool.getConnection();
        console.log('Conectado ao banco de dados MySQL!');
        connection.release();
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

// Testa a conexão no momento da inicialização
testConnection();

module.exports = promisePool;
