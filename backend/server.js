// server.js
const express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.js');
const app = express();
const port = 5000;
const host = '127.0.0.1';

// Middleware para analisar o corpo da requisição
app.use(bodyParser.json());

// Configuração da sessão
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Altere para true em produção com HTTPS
}));

// Configurar CORS para permitir requisições do React
app.use(cors());

// Definindo as rotas principais para os controladores
app.use('/', userRoutes);

// Iniciar o servidor
app.listen(port,host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
});

module.exports = app;
