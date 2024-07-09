const xlsx = require('xlsx');
const path = require('path');

// Carregar o arquivo Excel
const workbook = xlsx.readFile(path.join(__dirname, '../excel.xlsx'));

// Selecionar a primeira planilha
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Verificar o conteúdo do worksheet
console.log(worksheet);

// Converter a planilha em JSON a partir da linha 5 (índice 4)
const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1, range: 4 });

// Verificar os dados convertidos
console.log(jsonData);

// Extrair os nomes das colunas
const columnNames = jsonData[0];
console.log('Nomes das colunas:', columnNames);

// Inicializar variáveis para armazenar os dados de cada coluna
let columns = {};

// Inicializar arrays para cada coluna
columnNames.forEach(name => {
    columns[name] = [];
});

// Preencher as variáveis com os dados da planilha
jsonData.slice(1).forEach(row => {
    columnNames.forEach((name, index) => {
        columns[name].push(row[index]);
    });
});

// Exibir os dados das colunas
console.log(columns);
