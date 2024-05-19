const express = require('express');
const db = require('./database/db.js');
const app = express();
const bodyParser = require('body-parser')
const userRoutes = require("./routes/user.js");
const cors = require('cors');
const port = 3000;

app.use(bodyParser.json());

// Configurar CORS para permitir requisições do React
app.use(cors());

app.use('/', userRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
