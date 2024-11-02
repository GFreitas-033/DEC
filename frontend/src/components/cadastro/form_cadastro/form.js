import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Styles from "./form.module.css";

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

export default function Form() {
  const [step, setStep] = useState(0);
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [telefone, setTelefone] = useState("");

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

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const steps = [
    <Passo1 nextStep={nextStep} rg={rg} setRg={setRg} cpf={cpf} setCpf={setCpf} />,
    <Passo2 nextStep={nextStep} prevStep={prevStep} telefone={telefone} setTelefone={setTelefone} />,
    <Passo3
      nextStep={nextStep}
      prevStep={prevStep}
      handleBuscarCep={handleBuscarCep}
      uf={uf}
      cidade={cidade}
      bairro={bairro}
      logradouro={logradouro}
    />,
  ];

  return (
    <div className={Styles.container_formcadastro}>
      <form id="formcadastroaluno" className={Styles.form} autoComplete="off">
        <div className={Styles.textcenter}>
          <h1>Cadastrar</h1>
        </div>
        <CSSTransition
          in={true}
          key={step}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          {steps[step]}
        </CSSTransition>
      </form>
    </div>
  );
}

const Passo1 = ({ nextStep, rg, setRg, cpf, setCpf }) => (
  <div className={Styles.container_inputs}>
    <Email />
    <Senha />
    <Nome />
    <RG value={rg} setValue={setRg} /> {/* Passando rg e setRg como props */}
    <CPF value={cpf} setValue={setCpf} />
    <br />
    <button type="button" onClick={nextStep} className={Styles.button}>
      Avançar
    </button>
  </div>
);

const Passo2 = ({ nextStep, prevStep, telefone, setTelefone }) => (
  <div className={Styles.container_inputs}>
    <Telefone value={telefone} setValue={setTelefone} />
    <DtNasc />
    <Genero />
    <DC />
    <button type="button" onClick={prevStep} className={Styles.button}>
      Voltar
    </button>
    <button type="button" onClick={nextStep} className={Styles.button}>
      Avançar
    </button>
  </div>
);

const Passo3 = ({
  nextStep,
  prevStep,
  handleBuscarCep,
  uf,
  cidade,
  bairro,
  logradouro,
}) => (
  <div className={Styles.container_inputs}>
    <Cep onBuscarCep={handleBuscarCep} />
    <UF u={uf} />
    <Cidade c={cidade} />
    <Bairro b={bairro} />
    <Rua r={logradouro} />
    <br />
    <button type="button" onClick={prevStep} className={Styles.button}>
      Voltar
    </button>
    <button type="button" onClick={nextStep} className={Styles.button}>
      Cadastrar
    </button>
  </div>
);
