import React,{ useState } from "react"
import { useNavigate } from "react-router-dom";
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
import Genero from "../inputs_cadastro/genero_input";

export default function FormCadastroResponsavel(){
  
  const [step, setStep] = useState(0);
  const [cpfResp, setCpfResp] = useState("");
  const [rgResp, setRgResp] = useState("");
  const [telefoneResp, setTelefoneResp] = useState("");

  const navigate = useNavigate();
  const trocar = () => {
    navigate('/cadastro')
  }

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const steps = [
    <Passo4 nextStep={nextStep} trocar={trocar} rgResp={rgResp} setRgResp={setRgResp} cpfResp={cpfResp} setCpfResp={setCpfResp} />,
    <Passo5 prevStep={prevStep} telefoneResp={telefoneResp} setTelefoneResp={setTelefoneResp} />
  ];

  return(
    <div className={Styles.container_formcadastro}>
      <form id="formcadastroresponsavel" className={Styles.form} autoComplete="off">
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

const Passo4 = ({ nextStep, trocar, rgResp, setRgResp, cpfResp, setCpfResp }) => (
  <div>
    <div className={Styles.textcenter}>
      <h1>Dados do Responsável</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Email />
      <Senha />
      <Nome />
      <RG value={rgResp} setValue={setRgResp} />
      <CPF value={cpfResp} setValue={setCpfResp} />
      <br />
      <button type="button" onClick={trocar} className={Styles.button}>Voltar</button>
      <button type="button" onClick={nextStep} className={Styles.button}>Avançar</button>
    </div>
  </div>
);

const Passo5 = ({ prevStep, telefoneResp, setTelefoneResp }) => (
  <div>
    <div className={Styles.textcenter}>
      <h1>Dados do Responsável</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Telefone value={telefoneResp} setValue={setTelefoneResp} />
      <DtNasc />
      <Genero />
      <br />
      <button type="button" onClick={prevStep} className={Styles.button}>Voltar</button>
      <button type="button"  className={Styles.button}>Cadastrar</button>
    </div>
  </div>
);