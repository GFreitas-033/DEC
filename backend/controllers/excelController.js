const xlsx = require('xlsx');
const axios = require('axios');

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

// Função para formatar a data no padrão SQL (YYYY-MM-DD)
const formatarDataParaSQL = (data) => {
    if (data instanceof Date) {
        // Se a data já é um objeto Date, formate-a diretamente
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const ano = data.getFullYear();
        return `${ano}-${mes}-${dia}`;
    } else if (typeof data === 'number') {
        // Se a data é um número (serial do Excel), converta-o para data
        const dataExcel = new Date((data - (25567 + 1)) * 86400 * 1000);
        const dia = String(dataExcel.getDate()).padStart(2, '0');
        const mes = String(dataExcel.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const ano = dataExcel.getFullYear();
        return `${ano}-${mes}-${dia}`;
    } else if (typeof data === 'string') {
        // Se a data é uma string, faça a divisão
        const partes = data.split(/[\/\s:]/); // Dividir por '/' ou espaço ou ':'
        const dia = partes[0].padStart(2, '0');
        const mes = partes[1].padStart(2, '0');
        const ano = partes[2];
        return `${ano}-${mes}-${dia}`;
    } else {
        throw new Error('Formato de data não reconhecido');
    }
};

// Função para fazer o POST dos dados
const postData = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        return null;
    }
};

// Função principal para ler o Excel e enviar os dados
const processExcelAndSendData = async (filePath) => {
    // Leia o arquivo Excel
    const workbook = xlsx.readFile(filePath);

    // Selecione a primeira planilha
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Nomes das colunas que queremos ler
    const colunasEndereco = ['Logradouro', 'Número', 'Bairro', 'Cidade', 'CEP'];
    const colunasPessoa = ['Nome', 'Documento', 'RG', 'Telefone', 'Email', 'Nascimento', 'Sexo'];

    // Obtenha os índices das colunas pelos nomes
    const columnIndicesEndereco = getColumnIndicesByNames(sheet, colunasEndereco);
    const columnIndicesPessoa = getColumnIndicesByNames(sheet, colunasPessoa);

    if (Object.keys(columnIndicesEndereco).length > 0 && Object.keys(columnIndicesPessoa).length > 0) {
        // Obtenha os dados das colunas pelos índices
        const columnsDataEndereco = getColumnsDataByIndices(sheet, columnIndicesEndereco);
        const columnsDataPessoa = getColumnsDataByIndices(sheet, columnIndicesPessoa);
        const rowCount = columnsDataEndereco[Object.keys(columnsDataEndereco)[0]].length;

        // URLs das rotas para onde vamos enviar os dados
        const urlEndereco = 'http://localhost:5000/api/endereco';
        const urlPessoa = 'http://localhost:5000/api/pessoa';

        // Iterar por cada linha e construir os objetos de dados
        for (let i = 0; i < rowCount; i++) {
            const cepFormatado = columnsDataEndereco['CEP'][i].replace(/[\.-]/g, '');
            const dataEndereco = {
                rua: columnsDataEndereco['Logradouro'][i],
                numero: columnsDataEndereco['Número'][i],
                bairro: columnsDataEndereco['Bairro'][i],
                cidade: columnsDataEndereco['Cidade'][i],
                cep: cepFormatado,
                estado: "São Paulo"
            };

            // Fazer o POST dos dados do endereço
            const enderecoResponse = await postData(urlEndereco, dataEndereco);
            console.log(enderecoResponse);
            if (enderecoResponse && enderecoResponse.id) {
                const nomeCompleto = columnsDataPessoa['Nome'][i];
                const email = columnsDataPessoa['Email'][i] || `${nomeCompleto.split(' ')[0].toLowerCase()}@email.com`;
                const genero = columnsDataPessoa['Sexo'][i].toLowerCase() === 'feminino' ? 'f' : 'm';
                const dataNascimentoSQL = formatarDataParaSQL(columnsDataPessoa['Nascimento'][i]);
                const documentoFormatado = columnsDataPessoa['Documento'][i].replace(/[\.-]/g, '');
                const rgFormatado = columnsDataPessoa['RG'][i].replace(/[\.-]/g, '');

                const dataPessoa = {
                    nome_pessoa: nomeCompleto,
                    dt_nasc_pessoa: dataNascimentoSQL,
                    cpf_pessoa: documentoFormatado,
                    rg_pessoa: rgFormatado,
                    email_pessoa: email,
                    senha_pessoa: '1', // Ajuste conforme necessário
                    telefone_pessoa: columnsDataPessoa['Telefone'][i],
                    genero: genero,
                    id_endereco: enderecoResponse.id
                };

                // Fazer o POST dos dados da pessoa
                await postData(urlPessoa, dataPessoa);
            } else {
                console.error('Falha ao criar endereço para a linha:', i + 1, 'Dados do endereço:', dataEndereco);
            }
        }
    } else {
        console.log('Nenhuma das colunas especificadas foi encontrada.');
    }
};

// Chame a função principal com o caminho do arquivo Excel
const filePath = 'excel.xlsx';
processExcelAndSendData(filePath);
