import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StyleCadastroUnidade from "../cadastroDoAdm.module.css";
import Texto from "../textos_cadastro/texto_cadastro";
import axios from "axios";

// Imports dos Inputs para Pessoa
import Nome from "../../inputs_cadastro/nome_input";
import Cnpj from "../../inputs_cadastro/inputsUnidade/cnpj_input";
import Telefone from "../../inputs_cadastro/telefone_input";
import Email from "../../inputs_cadastro/email_input";
import MaisContatos from "../../inputs_cadastro/inputsUnidade/mais_contatos_input";
import TipoUnidade from "../../inputs_cadastro/inputsUnidade/tipoUnidade_input";
// Imports do Endereço
import Cep from "../../inputs_cadastro/endereco/cep_input";
import UF from "../../inputs_cadastro/endereco/uf_input";
import Cidade from "../../inputs_cadastro/endereco/cidade_input";
import Bairro from "../../inputs_cadastro/endereco/bairro_input";
import Rua from "../../inputs_cadastro/endereco/rua_input";
import Numero from "../../inputs_cadastro/endereco/numero_input";

import Botao from "../botao_cadastro/submit_cadastro";

export default function Content_cadastro_Unidade(props) {
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
        setCnpj(cnpj);
        setTelefone(telefone);
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
    }catch (error) {
      console.log(error);
    }
  };

  function tratamentoString(inputString) {
    return inputString.replace(/[.\-()\s]/g, '');
  }

  const cliquei = async (event) => {
    event.preventDefault();

    if (id_unidade !== undefined) {
      try {
        let responseEndereco = await axios.put(`/api/endereco/${id_endereco}`, {
          cep: cep,
          estado: uf,
          cidade: cidade,
          bairro: bairro,
          rua: logradouro,
          numero: numero
        });

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
    }else{
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
          cnpj_unidade: cnpj, 
          telefone_unidade: telefone, 
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
          <Nome value={nome} setValue={setNome}/>
          <Cnpj value={cnpj} setValue={setCnpj} />
          <Telefone value={telefone} setValue={setTelefone} />
          <Email value={email} setValue={setEmail}/>
          <MaisContatos value={maisContatos} setValue={setMaisContatos}/>
          <TipoUnidade value={tipoUnidade} setValue={setTipoUnidade} />
          <Cep onBuscarCep={handleBuscarCep} value={cep} setValue={setCep}/>
          <UF u={uf} />
          <Cidade c={cidade} />
          <Bairro b={bairro} />
          <Rua r={logradouro} />
          <Numero value={numero} setValue={setNumero} />
        </div>
        <div className={StyleCadastroUnidade.divBtn}>
          <Botao btn={props.botao} className={StyleCadastroUnidade.btn} />
        </div>
      </form>
    </div>
  );
}
