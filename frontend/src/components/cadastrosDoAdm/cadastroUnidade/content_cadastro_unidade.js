import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StyleCadastroUnidade from "../cadastroDoAdm.module.css";
import Texto from "../../cadastro/textos_cadastro/texto_cadastro";
import axios from "axios";

// Imports dos Inputs para Pessoa
import Nome from "../../cadastro/inputs_cadastro/nome_input";
import Cnpj from "../../cadastro/inputs_cadastro/cnpj_input";
import Telefone from "../../cadastro/inputs_cadastro/telefone_input";
import Email from "../../cadastro/inputs_cadastro/email_input";
import MaisContatos from "../../cadastro/inputs_cadastro/mais_contatos_input";
// Imports do Endereço
import Cep from "../../cadastro/inputs_cadastro/endereco/cep_input";
import UF from "../../cadastro/inputs_cadastro/endereco/uf_input";
import Cidade from "../../cadastro/inputs_cadastro/endereco/cidade_input";
import Bairro from "../../cadastro/inputs_cadastro/endereco/bairro_input";
import Rua from "../../cadastro/inputs_cadastro/endereco/rua_input";

import Botao from "../../cadastro/botao_cadastro/submit_cadastro";

export default function Content_cadastro_Unidade(props) {
  const navigate = useNavigate();
  let { id_unidade } = useParams();

  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  useEffect(() => {
    if (id_unidade !== undefined) {
      id_unidade = parseInt(id_unidade);
      preencherDados();
    }
  }, [id_unidade]);

  const handleBuscarCep = (cep) => {
    if (cep.length < 9) {
      setLogradouro("");
      setBairro("");
      setCidade("");
      setUf("");
      return;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((dados) => {
        setLogradouro(dados.logradouro);
        setBairro(dados.bairro);
        setCidade(dados.localidade);
        setUf(dados.uf);
      })
      .catch((error) => {
        console.error('Erro ao buscar CEP:', error);
      });
  };

  const preencherDados = async () => {
    // Código para preencher dados
    // Descomentar e completar a lógica quando estiver disponível
    // try {
    //   let responseUnidade = await axios.get('/api/unidade');
    //   responseUnidade = responseUnidade.data;
    //   const unidade = responseUnidade.find(item => item.id_unidade === id_unidade);
    //   // Preencher campos com os dados da unidade
    // } catch (error) {
    //   console.log(error);
    // }
  };

  function tratamentoString(inputString) {
    return inputString.replace(/[.\-()\s]/g, '');
  }

  const cliquei = (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cnpj = tratamentoString(document.getElementById('cnpj').value);
    const telefone = tratamentoString(document.getElementById('telefone').value);
    const cep = document.getElementById('cep').value;
    const uf = document.getElementById('uf').value;
    const cidade = document.getElementById('cidade').value;
    const bairro = document.getElementById('bairro').value;
    const rua = document.getElementById('rua').value;
    const maisContatos = document.getElementById('maisContatos').value;

    if (id_unidade === undefined) {
      navigate('/cadastro/unidade/responsavel', {
        state: {
          nome,
          email,
          cnpj,
          telefone,
          cep,
          uf,
          cidade,
          bairro,
          rua,
          maisContatos
        }
      });
    }
  };

  return (
    <div className={StyleCadastroUnidade.ContentC}>
      <h1 className={StyleCadastroUnidade.titulo}>
        <Texto text={props.texto} />
      </h1>
      <form className={StyleCadastroUnidade.content} autoComplete="off" onSubmit={cliquei}>
        <div className={StyleCadastroUnidade.contentInputs}>
          <Nome />
          <Cnpj />
          <Telefone />
          <Email />
          <MaisContatos />
          <Cep onBuscarCep={handleBuscarCep} />
          <UF u={uf} />
          <Cidade c={cidade} />
          <Bairro b={bairro} />
          <Rua r={logradouro} />
        </div>
        <div className={StyleCadastroUnidade.divBtn}>
          <Botao btn={props.botao} className={StyleCadastroUnidade.btn} />
        </div>
      </form>
    </div>
  );
}
