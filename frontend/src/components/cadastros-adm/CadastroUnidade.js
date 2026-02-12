import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import ContainerCss from "../containers.module.css";
import StyleCadastroUnidade from "./cadastroDoAdm.module.css";

import BackgroundSistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

// Imports dos Inputs para Pessoa
import Nome from "../inputs-cadastro/Nome";
import Cnpj from "../inputs-cadastro/inputs-unidade/Cnpj";
import Telefone from "../inputs-cadastro/Telefone";
import Email from "../inputs-cadastro/Email";
import MaisContatos from "../inputs-cadastro/inputs-unidade/MaisContatos";
import TipoUnidade from "../inputs-cadastro/inputs-unidade/TipoUnidade";
// Imports do Endereço
import Cep from "../inputs-cadastro/endereco/Cep";
import UF from "../inputs-cadastro/endereco/Uf";
import Cidade from "../inputs-cadastro/endereco/Cidade";
import Bairro from "../inputs-cadastro/endereco/Bairro";
import Rua from "../inputs-cadastro/endereco/Rua";
import Numero from "../inputs-cadastro/endereco/Numero";

export default function Cadastro_unidade({ texto, btn }) {
    let { id_unidade } = useParams();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [telefone, setTelefone] = useState("");
    const [id_endereco, setEndereco] = useState(null);
    const [responseUnidade, setResponseUnidade] = useState(null);
    const [numero, setNumero] = useState("");
    const [maisContatos, setMaisContatos] = useState("");
    const [tipoUnidade, setTipoUnidade] = useState("");

    const alertErroCadastro = () => {
        Swal.fire({
            title: "Não foi possível Cadastrar a Unidade.",
            icon: "error",
            confirmButtonColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        })
    };
    const alertSucessoCadastro = () => {
        Swal.fire({
            title: "Unidade Cadastrada com Sucesso.",
            icon: "success",
            confirmButtonColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        })
    };

    const handleBuscarCep = (cep) => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((dados) => {
                if (!dados.erro) {
                    if (dados.logradouro) setLogradouro(dados.logradouro);
                    if (dados.bairro) setBairro(dados.bairro);
                    if (dados.localidade) setCidade(dados.localidade);
                    if (dados.uf) setUf(dados.uf);
                } else {
                    console.warn("CEP inválido.");
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar CEP:", error);
            });
    };

    function formatCNPJ(cnpj) {
        cnpj = cnpj.replace(/\D/g, '');
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    }

    const formatTelefone = (telefone) => {
        telefone = telefone.replace(/\D/g, ''); // Remove non-digits
        if (telefone.length === 11) {
            return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (telefone.length === 10) {
            return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return telefone;
    };

    const preencherDados = useCallback(async (id) => {
        // Código para preencher dados
        // Descomentar e completar a lógica quando estiver disponível
        try {
            let responseUnidade = await axios.get('/api/unidade');
            responseUnidade = responseUnidade.data;
            responseUnidade = responseUnidade.find(item => item.id_unidade === id);
            setEndereco(responseUnidade.id_endereco);
            setNome(responseUnidade.nome_unidade);
            setEmail(responseUnidade.email_unidade);
            setMaisContatos(responseUnidade.mais_contatos);
            setCnpj(formatCNPJ(responseUnidade.cnpj_unidade));
            setTelefone(formatTelefone(responseUnidade.telefone_unidade));
            setTipoUnidade(responseUnidade.tipo);
            let responseEndereco = await axios.get('/api/endereco');
            responseEndereco = responseEndereco.data;
            responseEndereco = responseEndereco.find(item => item.id_endereco === responseUnidade.id_endereco);
            setCep(responseEndereco.cep);
            setUf(responseEndereco.estado);
            setCidade(responseEndereco.cidade);
            setBairro(responseEndereco.bairro);
            setLogradouro(responseEndereco.rua);
            setNumero(responseEndereco.numero);
        } catch (error) {
            console.log(error);
        }
    }, []);

    function tratamentoString(inputString) {
        return inputString.replace(/[.\-()\s]/g, '');
    }

    const cliquei = async (event) => {
        event.preventDefault();

        if (id_unidade !== undefined) {
            try {
                // let responseEndereco = await axios.put(`/api/endereco/${id_endereco}`, {
                //     cep: cep,
                //     estado: uf,
                //     cidade: cidade,
                //     bairro: bairro,
                //     rua: logradouro,
                //     numero: numero
                // });

                let responseUnidade = await axios.put(`/api/unidade/${id_unidade}`, {
                    nome_unidade: nome,
                    email_unidade: email,
                    cnpj_unidade: tratamentoString(cnpj),
                    telefone_unidade: tratamentoString(telefone),
                    mais_contatos: maisContatos,
                    id_endereco: id_endereco,
                    tipo: tipoUnidade,
                });

                setResponseUnidade(responseUnidade);
            } catch (error) {
                console.log("Erro ao editar unidade: ", error);
            }
        } else {
            try {
                let responseEndereco_Unidade = await axios.post('/api/endereco/', {
                    cep: cep,
                    estado: uf,
                    cidade: cidade,
                    bairro: bairro,
                    rua: logradouro,
                    numero: numero
                });
                responseEndereco_Unidade = responseEndereco_Unidade.data;

                let responseUnidade = await axios.post('/api/unidade', {
                    nome_unidade: nome,
                    cnpj_unidade: tratamentoString(cnpj),
                    telefone_unidade: tratamentoString(telefone),
                    email_unidade: email,
                    mais_contatos: maisContatos,
                    id_endereco: responseEndereco_Unidade.id,
                    tipo: tipoUnidade,
                })
                responseUnidade = responseUnidade.data;
                console.log(responseUnidade);
                setResponseUnidade(responseUnidade);
            } catch (error) {
                console.log("Erro ao criar undidade: ", error);
                alertErroCadastro();
            }
        }
    };

    useEffect(() => {
        if (responseUnidade) {
            alertSucessoCadastro();
            if (id_unidade !== undefined) {
                preencherDados(parseInt(id_unidade));
            }
        }
    }, [responseUnidade, preencherDados, id_unidade]);

    useEffect(() => {
        if (responseUnidade) {
            alertSucessoCadastro();
            preencherDados(parseInt(id_unidade));
        }
    }, [responseUnidade, preencherDados, id_unidade]);

    return (
        <div>
            <BackgroundSistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={StyleCadastroUnidade.content}>
                    <div className={StyleCadastroUnidade.textcenter}>
                        <h1>{texto}</h1>
                    </div>
                    <form className={StyleCadastroUnidade.form} autoComplete="off" onSubmit={cliquei}>
                        <div className={StyleCadastroUnidade.contentInputs}>
                            <Nome value={nome} setValue={setNome} />
                            <Cnpj value={cnpj} setValue={setCnpj} />
                            <Telefone value={telefone} setValue={setTelefone} />
                            <Email value={email} setValue={setEmail} />
                            <MaisContatos value={maisContatos} setValue={setMaisContatos} />
                            <TipoUnidade value={tipoUnidade} setValue={setTipoUnidade} />
                            <Cep onBuscarCep={handleBuscarCep} value={cep} setValue={setCep} />
                            <UF value={uf} setValue={setUf} />
                            <Cidade value={cidade} setValue={setCidade} />
                            <Bairro value={bairro} setValue={setBairro} />
                            <Rua value={logradouro} setValue={setLogradouro} />
                            <Numero value={numero} setValue={setNumero} />
                        </div>
                        <div className={StyleCadastroUnidade.divBtn}>
                            <button className={StyleCadastroUnidade.btn}>
                                <h1>{btn}</h1>
                            </button>
                        </div>
                    </form>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    )
}