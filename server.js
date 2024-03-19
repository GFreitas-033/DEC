const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Define o diretório de visualizações e a engine de visualização como EJS
app.set('views', path.join(__dirname, 'frontend/views'));
app.set('view engine', 'ejs');

// Rota para a página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
