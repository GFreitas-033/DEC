import React, { useState } from "react";
import Styles from "./form.module.css";
import Texto from "../textos_cadastro/texto_cadastro";

// Import dos Input
import Email from "../inputs_cadastro/email_input";
import Senha from "../inputs_cadastro/senha_input";
import Nome from "../inputs_cadastro/nome_input";
import CPF from "../inputs_cadastro/cpf_input";
import RG from "../inputs_cadastro/rg_input";
import Telefone from "../inputs_cadastro/telefone_input";
import DtNasc from "../inputs_cadastro/dt_nasc_input";
import DC from "../inputs_cadastro/destro_canhoto_input";
import Genero from "../inputs_cadastro/genero_input";
// Import dos Input de Endereço
import Cep from "../inputs_cadastro/endereco/cep_input";
import UF from "../inputs_cadastro/endereco/uf_input";
import Cidade from "../inputs_cadastro/endereco/cidade_input";
import Bairro from "../inputs_cadastro/endereco/bairro_input";
import Rua from "../inputs_cadastro/endereco/rua_input";
// Import Botão
import Botao from "../botao_cadastro/submit_cadastro";

export default function Form(props) {
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
    } else {
      // Exibe mensagens de validação
      form.reportValidity();
    }
  };

  // Recarrega a página quando responsePessoa estiver disponível
  if (responsePessoa) {
    window.location.reload();
  }

  return (
    <div className={Styles.container_formcadastro}>
      <form id="formcadastroaluno" className={Styles.form} autoComplete="off" onSubmit={handleSubmit}>
        <Texto text={props.texto} />
        <div className={Styles.container_inputs}>
          <Email />
          <Senha />
          <Nome />
          <CPF />
          <RG />
          <Telefone />
          <DtNasc />
          <DC />
          <Genero />
          <Cep onBuscarCep={handleBuscarCep} />
          <UF u={uf} />
          <Cidade c={cidade} />
          <Bairro b={bairro} />
          <Rua r={logradouro} />
        </div>
        <Botao btn={props.botao} onResponse={setResponsePessoa} />
      </form>
    </div>
  );
}
