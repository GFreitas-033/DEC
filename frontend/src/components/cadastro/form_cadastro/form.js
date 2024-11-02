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
// Continue importando os outros inputs...

export default function Form() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const steps = [
    <Passo1 nextStep={nextStep} />,
    <Passo2 nextStep={nextStep} prevStep={prevStep} />,
    <Passo3 nextStep={nextStep} prevStep={prevStep} />,

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
  )
}

const Passo1 = ({ nextStep }) => (
  <div className={Styles.container_inputs}>
    <Email />
    <Senha />
    <Nome />
    <RG />
    <CPF />
    <br />
    <button type="button" onClick={nextStep} className={Styles.button}>
      Avançar
    </button>
  </div>
)

const Passo2 = ({ nextStep, prevStep }) => (
  <div className={Styles.container_inputs}>
    <Telefone />
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
)

const Passo3 = ({ nextStep, prevStep }) => (
  <div className={Styles.container_inputs}>
    <Cep />
    <UF />
    <Cidade />
    <Bairro />
    <Rua />
    <br />
    <button type="button" onClick={prevStep} className={Styles.button}>
      Voltar
    </button>
    <button type="button" onClick={nextStep} className={Styles.button}>
      Cadastrar
    </button>
  </div>
)