import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Styles from "./form.module.css";

// Import dos Inputs
import Email from "../inputs_cadastro/email_input";
import Senha from "../inputs_cadastro/senha_input";
import Nome from "../inputs_cadastro/nome_input";
// Continue importando os outros inputs...

export default function Form() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const steps = [
    <StepOne nextStep={nextStep} />,
    <StepTwo nextStep={nextStep} />,
    // Adicione mais etapas conforme necessário...
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

const StepOne = ({ nextStep }) => (
  <div className={Styles.container_inputs}>
    <Email />
    <Senha />
    <Nome />
    <button type="button" onClick={nextStep} className={Styles.button}>
      Avançar
    </button>
  </div>
);

const StepTwo = ({ nextStep }) => (
  <div className={Styles.container_inputs}>
    {/* Adicione os inputs da segunda etapa aqui */}
    <button type="button" onClick={nextStep} className={Styles.button}>
      Avançar
    </button>
  </div>
);

// Continue definindo mais etapas conforme necessário...