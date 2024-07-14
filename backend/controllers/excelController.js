const xlsx = require('xlsx');

// Função para obter os índices das colunas pelos nomes, assumindo que os nomes estão na linha 6
const getColumnIndicesByNames = (sheet, columnNames) => {
    const headerRow = 5; // Índice da linha de cabeçalho (linha 6, zero-based)
    const range = xlsx.utils.decode_range(sheet['!ref']);
    const columnIndices = {};

    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = xlsx.utils.encode_cell({ c: col, r: headerRow });
        const cell = sheet[cellAddress];
        if (cell && columnNames.includes(cell.v)) {
            columnIndices[cell.v] = col;
        }
    }

    return columnIndices;
};

// Função para obter os dados de múltiplas colunas pelos índices, começando na linha 7
const getColumnsDataByIndices = (sheet, columnIndices) => {
    const columnsData = {};
    const startRow = 6; // Linha inicial (linha 7, zero-based)
    const range = xlsx.utils.decode_range(sheet['!ref']);

    for (const [columnName, colIndex] of Object.entries(columnIndices)) {
        const columnData = [];
        for (let row = startRow; row <= range.e.r; row++) {
            const cellAddress = xlsx.utils.encode_cell({ c: colIndex, r: row });
            const cell = sheet[cellAddress];
            columnData.push(cell ? cell.v : undefined);
        }
        columnsData[columnName] = columnData;
    }

    return columnsData;
};

// Leia o arquivo Excel
const workbook = xlsx.readFile('excel.xlsx');

// Selecione a primeira planilha
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Nomes das colunas que queremos ler
const columnNames = ['Matrícula', 'Nome', 'Documento'];

// Obtenha os índices das colunas pelos nomes
const columnIndices = getColumnIndicesByNames(sheet, columnNames);

if (Object.keys(columnIndices).length > 0) {
    // Obtenha os dados das colunas pelos índices
    const columnsData = getColumnsDataByIndices(sheet, columnIndices);
    console.log('Dados das colunas:', columnsData);
} else {
    console.log('Nenhuma das colunas especificadas foi encontrada.');
}
