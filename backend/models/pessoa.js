const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function readPessoa() {
    try {
        const results = await db.query('SELECT * FROM pessoa');
        return results[0];
    } catch (err) {
        console.error('Erro ao obter dados:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function createPessoa(nome_pessoa, dt_nasc_pessoa, cpf_pessoa, rg_pessoa, email_pessoa, senha_pessoa, telefone_pessoa,genero, id_endereco, adm) {
    senha_pessoa = await bcrypt.hash(senha_pessoa,saltRounds); 
    try {
        const result = await db.query('INSERT INTO pessoa (nome_pessoa, dt_nasc_pessoa, cpf_pessoa, rg_pessoa, email_pessoa, senha_pessoa, telefone_pessoa,genero, id_endereco, adm) VALUES (?,?,?,?,?,?,?,?,?,?)', 
                      [nome_pessoa, dt_nasc_pessoa, cpf_pessoa, rg_pessoa, email_pessoa, senha_pessoa, telefone_pessoa,genero, id_endereco, adm]);
        const novoId = result[0].insertId;
        const [novaPessoa] = await db.query('SELECT * FROM pessoa WHERE id_pessoa = ?', [novoId]);
        return novaPessoa[0];
    } catch (err) {
        console.error('Erro ao criar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function updatePessoa(id_pessoa, nome_pessoa, dt_nasc_pessoa, cpf_pessoa, rg_pessoa, email_pessoa, telefone_pessoa,genero, id_endereco) {
    try {
        await db.query('UPDATE pessoa SET nome_pessoa = ?, dt_nasc_pessoa = ?, cpf_pessoa = ?, rg_pessoa = ?, email_pessoa = ?, telefone_pessoa = ?, genero = ?, id_endereco = ? WHERE id_pessoa = ?', 
                      [nome_pessoa, dt_nasc_pessoa, cpf_pessoa, rg_pessoa, email_pessoa, telefone_pessoa,genero, id_endereco, id_pessoa]);
    } catch (err) {
        console.error('Erro ao atualizar registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function deletePessoa(id_pessoa) {
    try {
        await db.query('DELETE FROM pessoa WHERE id_pessoa = ?', [id_pessoa]);
    } catch (err) {
        console.error('Erro ao excluir registro:', err);
        throw new Error('Erro interno do servidor');
    }
}

async function getPessoaByCpf(cpf_pessoa) {
    try {
        const [result] = await db.query('SELECT id_pessoa, adm FROM pessoa WHERE cpf_pessoa = ?', [cpf_pessoa]);
        return result.length > 0 ? result[0] : null;
    } catch (err) {
        console.error('Erro ao buscar CPF:', err);
        throw new Error('Erro interno do servidor');
    }
}


module.exports = {
    readPessoa,
    createPessoa,
    updatePessoa,
    deletePessoa,
    getPessoaByCpf
};
