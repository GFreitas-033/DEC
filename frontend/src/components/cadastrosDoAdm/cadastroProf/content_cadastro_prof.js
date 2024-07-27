import React, { useState } from "react";
import StyleCadastroProf from "../cadastroDoAdm.module.css";
import Texto from "../../cadastro/textos_cadastro/texto_cadastro";
import axios from "axios";

// Imports dos Inputs para Pessoa
import Imagem from "../../cadastro/inputs_cadastro/imagem_input";
import Email from "../../cadastro/inputs_cadastro/email_input";
import Senha from "../../cadastro/inputs_cadastro/senha_input";
import Nome from "../../cadastro/inputs_cadastro/nome_input";
import Cpf from "../../cadastro/inputs_cadastro/cpf_input";
import Rg from "../../cadastro/inputs_cadastro/rg_input";
import Telefone from "../../cadastro/inputs_cadastro/telefone_input";
import DtNasc from "../../cadastro/inputs_cadastro/dt_nasc_input";
import Genero from "../../cadastro/inputs_cadastro/genero_input";

// Imports do Endereço
import Cep from "../../cadastro/inputs_cadastro/endereco/cep_input";
import UF from "../../cadastro/inputs_cadastro/endereco/uf_input";
import Cidade from "../../cadastro/inputs_cadastro/endereco/cidade_input";
import Bairro from "../../cadastro/inputs_cadastro/endereco/bairro_input";
import Rua from "../../cadastro/inputs_cadastro/endereco/rua_input";

import Botao from "../../cadastro/botao_cadastro/submit_cadastro";

export default function Content_cadastro_Professor(props) {
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [responsePessoa, setResponsePessoa] = useState(null);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
      cliquei();
    } else {
      form.reportValidity();
    }
  };

  function tratamentoString(inputString) {
    return inputString.replace(/[.\-()\s]/g, '');
  }


  async function cliquei() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const nome = document.getElementById('nome').value;
    const cpf = tratamentoString(document.getElementById('cpf').value);
    const rg = tratamentoString(document.getElementById('rg').value);
    const telefone = tratamentoString(document.getElementById('telefone').value);
    const dt_nascimento = document.getElementById('dt_nasc').value;
    const genero = document.getElementById('genero').value;
    const cep = document.getElementById('cep').value;
    const uf = document.getElementById('uf').value;
    const cidade = document.getElementById('cidade').value;
    const bairro = document.getElementById('bairro').value;
    const rua = document.getElementById('rua').value;
    const caminho_foto = document.getElementById('imagem').value;

    try {
      let responseEndereco = await axios.post('/api/endereco/', {
        cep: cep,
        estado: uf,
        cidade: cidade,
        bairro: bairro,
        rua: rua,
        numero: null
      });
      responseEndereco = responseEndereco.data;

      let responsePessoa = await axios.post('/api/pessoa/', {
        nome_pessoa: nome,
        dt_nasc_pessoa: dt_nascimento,
        cpf_pessoa: cpf,
        rg_pessoa: rg,
        email_pessoa: email,
        senha_pessoa: senha,
        telefone_pessoa: telefone,
        genero: genero,
        id_endereco: responseEndereco.id,
        adm: null
      });
      responsePessoa = responsePessoa.data;

      const responseProfessor = await axios.post('/api/professor/', {
        id_pessoa: responsePessoa.id,
        caminho_foto: null
      });

      setResponsePessoa(responseProfessor.data);
    } catch (error) {
      console.log("Erro ao criar professor: ", error);
    }
  }

  // Recarrega a página quando responsePessoa estiver disponível
  if (responsePessoa) {
    window.location.reload();
  }

  return (
    <div className={StyleCadastroProf.ContentC}>
      <h1 className={StyleCadastroProf.titulo}>
        <Texto text={props.texto} />
      </h1>

      <form className={StyleCadastroProf.content} autoComplete="off" onSubmit={handleSubmit}>
        <div className={StyleCadastroProf.contentInputs}>
          <Imagem id="imagem" />
          <Email id="email" />
          <Senha id="senha" />
          <Nome id="nome" />
          <Cpf id="cpf" />
          <Rg id="rg" />
          <Telefone id="telefone" />
          <DtNasc id="dt_nasc" />
          <Genero id="genero" />

          <Cep onBuscarCep={handleBuscarCep} id="cep" />

          <UF u={uf} id="uf" />
          <Cidade c={cidade} id="cidade" />
          <Bairro b={bairro} id="bairro" />
          <Rua r={logradouro} id="rua" />
        </div>

        <div className={StyleCadastroProf.divBtn}>
          <Botao btn={props.botao} onClick={cliquei} className={StyleCadastroProf.btn} />
        </div>
      </form>
    </div>
  );
}
