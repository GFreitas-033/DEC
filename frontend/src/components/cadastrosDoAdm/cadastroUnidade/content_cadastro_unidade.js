import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StyleCadastroUnidade from "../cadastroDoAdm.module.css";
import Texto from "../textos_cadastro/texto_cadastro";
import axios from "axios";

// Imports dos Inputs para Pessoa
import Nome from "../../inputs_cadastro/nome_input";
import Cnpj from "../../inputs_cadastro/cnpj_input";
import Telefone from "../../inputs_cadastro/telefone_input";
import Email from "../../inputs_cadastro/email_input";
import MaisContatos from "../../inputs_cadastro/mais_contatos_input";
// Imports do Endereço
import Cep from "../../inputs_cadastro/endereco/cep_input";
import UF from "../../inputs_cadastro/endereco/uf_input";
import Cidade from "../../inputs_cadastro/endereco/cidade_input";
import Bairro from "../../inputs_cadastro/endereco/bairro_input";
import Rua from "../../inputs_cadastro/endereco/rua_input";
import Numero from "../../inputs_cadastro/endereco/numero_input";

import Botao from "../botao_cadastro/submit_cadastro";

export default function Content_cadastro_Unidade(props) {
  const navigate = useNavigate();
  let { id_unidade } = useParams();

  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [id_endereco, setEndereco] = useState(null);
  const [responseUnidade, setResponseUnidade] = useState(null);

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
        document.getElementById('cnpj').value = cnpj;
        document.getElementById('telefone').value = telefone;
      })
      .catch((error) => {
        console.error('Erro ao buscar CEP:', error);
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

  const preencherDados = async () => {
    // Código para preencher dados
    // Descomentar e completar a lógica quando estiver disponível
    try {
      let responseUnidade = await axios.get('/api/unidade');
      responseUnidade = responseUnidade.data;
      responseUnidade = responseUnidade.find(item => item.id_unidade === id_unidade);
      setEndereco(responseUnidade.id_endereco);
      document.getElementById('nome').value = responseUnidade.nome_unidade;
      document.getElementById('email').value = responseUnidade.email_unidade;
      document.getElementById('cnpj').value = formatCNPJ(responseUnidade.cnpj_unidade);
      document.getElementById('telefone').value =  formatTelefone(responseUnidade.telefone_unidade);
      document.getElementById('maisContatos').value = responseUnidade.mais_contatos;
      setCnpj(formatCNPJ(responseUnidade.cnpj_unidade));
      setTelefone(formatTelefone(responseUnidade.telefone_unidade));
      let responseEndereco = await axios.get('/api/endereco');
      responseEndereco = responseEndereco.data;
      responseEndereco = responseEndereco.find(item => item.id_endereco === responseUnidade.id_endereco);
      document.getElementById('cep').value = responseEndereco.cep;
      document.getElementById('uf').value = responseEndereco.estado;
      document.getElementById('cidade').value = responseEndereco.cidade;
      document.getElementById('bairro').value = responseEndereco.bairro;
      document.getElementById('rua').value = responseEndereco.rua;
      document.getElementById('numero').value = responseEndereco.numero;
    }catch (error) {
      console.log(error);
    }
  };

  function tratamentoString(inputString) {
    return inputString.replace(/[.\-()\s]/g, '');
  }

  const cliquei = async (event) => {
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
    const numero = document.getElementById('numero').value;

    if (id_unidade !== undefined) {
      try {
        let responseEndereco = await axios.put(`/api/endereco/${id_endereco}`, {
          cep: cep,
          estado: uf,
          cidade: cidade,
          bairro: bairro,
          rua: rua,
          numero: numero
        });

        let responseUnidade = await axios.put(`/api/unidade/${id_unidade}`, {
          nome_unidade: nome,
          email_unidade: email,
          cnpj_unidade: cnpj,
          telefone_unidade: telefone,
          mais_contatos: maisContatos,
          id_endereco: id_endereco
        });

        setResponseUnidade(responseUnidade);
      } catch (error) {
        console.log("Erro ao editar unidade: ", error);
      }
    }else{
      try {
        let responseEndereco_Unidade = await axios.post('/api/endereco/', {
          cep: cep,
          estado: uf,
          cidade: cidade,
          bairro: bairro,
          rua: rua,
          numero: numero
        });
        responseEndereco_Unidade = responseEndereco_Unidade.data;
  
        let responseUnidade = await axios.post('/api/unidade', {
          nome_unidade: nome, 
          cnpj_unidade: cnpj, 
          telefone_unidade: telefone, 
          email_unidade: email, 
          mais_contatos: maisContatos, 
          id_endereco: responseEndereco_Unidade.id
        })
        responseUnidade = responseUnidade.data;
        console.log(responseUnidade);
        setResponseUnidade(responseUnidade);
      } catch (error) {
        console.log("Erro ao criar undidade: ", error);
      }
    }
  };

  if (responseUnidade) {
    alert("Sucesso!!!");
    window.location.reload();
  }

  return (
    <div className={StyleCadastroUnidade.ContentC}>
      <h1 className={StyleCadastroUnidade.titulo}>
        <Texto text={props.texto} />
      </h1>
      <form className={StyleCadastroUnidade.content} autoComplete="off" onSubmit={cliquei}>
        <div className={StyleCadastroUnidade.contentInputs}>
          <Nome />
          <Cnpj value={cnpj} setValue={setCnpj} />
          <Telefone value={telefone} setValue={setTelefone} />
          <Email />
          <MaisContatos />
          <Cep onBuscarCep={handleBuscarCep} />
          <UF u={uf} />
          <Cidade c={cidade} />
          <Bairro b={bairro} />
          <Rua r={logradouro} />
          <Numero />
        </div>
        <div className={StyleCadastroUnidade.divBtn}>
          <Botao btn={props.botao} className={StyleCadastroUnidade.btn} />
        </div>
      </form>
    </div>
  );
}
