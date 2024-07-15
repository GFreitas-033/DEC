// controllers/enderecoController.js
const express = require("express");
const router = express.Router();
const enderecoModel = require("../models/endereco.js");

router.post('/', async (req, res) => {
    const { cep, estado, cidade, bairro, rua, numero } = req.body;

    try {
        const novoEndereco = await enderecoModel.createEndereco(cep, estado, cidade, bairro, rua, numero);
        res.status(201).json({
            id: novoEndereco.id_endereco, // Assumindo que a coluna da chave primária é `id_endereco`
            rua: novoEndereco.rua,
            numero: novoEndereco.numero,
            bairro: novoEndereco.bairro,
            cidade: novoEndereco.cidade,
            cep: novoEndereco.cep,
            estado: novoEndereco.estado
        });
    } catch (error) {
        res.status(500).send('Erro ao criar o registro: ' + error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await enderecoModel.readEndereco();
        res.json(data);
    } catch (error) {
        res.status(500).send('Erro ao obter registros: ' + error.message);
    }
});

router.put('/:id', async (req, res) => {
    const id_endereco = parseInt(req.params.id);
    const { cep, estado, cidade, bairro, rua, numero } = req.body;

    try {
        await enderecoModel.updateEndereco(id_endereco, cep, estado, cidade, bairro, rua, numero);
        res.status(200).send('Registro atualizado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao atualizar o registro: ' + error.message);
    }
});

router.delete('/:id', async (req, res) => {
    const id_endereco = parseInt(req.params.id);

    try {
        await enderecoModel.deleteEndereco(id_endereco);
        res.status(200).send('Registro excluído com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao excluir o registro: ' + error.message);
    }
});

module.exports = router;
