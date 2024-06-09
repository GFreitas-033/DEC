// server.js
const express = require('express');
const db = require('./database/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.js');
const app = express();
const port = 5000;

// Middleware para analisar o corpo da requisição
app.use(bodyParser.json());

// Configurar CORS para permitir requisições do React
app.use(cors());

// Definindo as rotas principais para os controladores
app.use('/', userRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});

module.exports = app;
