import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Styles from "./form.module.css";
import axios from "axios";

import Nome from "../inputs_cadastro/nome_input";
import Email from "../inputs_cadastro/email_input";
import CPF from "../inputs_cadastro/cpf_input";
import Genero from "../inputs_cadastro/genero_input";
import RG from "../inputs_cadastro/rg_input";
import Telefone from "../inputs_cadastro/telefone_input";
import DtNasc from "../inputs_cadastro/dt_nasc_input";
import DC from "../inputs_cadastro/destro_canhoto_input";


// // Import dos Input de Endereço
// import Cep from "../inputs_cadastro/endereco/cep_input";
// import UF from "../inputs_cadastro/endereco/uf_input";
// import Cidade from "../inputs_cadastro/endereco/cidade_input";
// import Bairro from "../inputs_cadastro/endereco/bairro_input";
// import Rua from "../inputs_cadastro/endereco/rua_input";

export default function Form(){
    const [step, setStep] = useState(0);
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [cep, setCep] = useState("");
    const [id_endereco, setEndereco] = useState(null);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [genero, setGenero] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [mao_dominante, setMao_Dominante] = useState("");

    const [responsePessoa, setResponsePessoa] = useState(null);

    const [nomeResp, setNomeResp] = useState("");
    const [emailResp, setEmailResp] = useState("");
    const [cpfResp, setCpfResp] = useState("");
    const [generoResp, setGeneroResp] = useState("");
    const [rgResp, setRgResp] = useState("");   
    const [telefoneResp, setTelefoneResp] = useState("");

    const [idade, setIdade] = useState("");

    const nextStep = () => {
        setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    };
        
    const prevStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0));
    };
        
    const steps = [
      <Passo1 nextStep={nextStep} rg={rg} setRg={setRg} cpf={cpf} setCpf={setCpf} email={email} setEmail={setEmail} nome={nome} setNome={setNome} />,
      <Passo2 prevStep={prevStep} telefoneResp={telefoneResp} setTelefoneResp={setTelefoneResp} nascimentoResp={nascimentoResp} setNascimentoResp={setNascimentoResp} generoResp={generoResp} setGeneroResp={setGeneroResp} cliquei={cliquei} />,
    ];

    return(
        <div>
            <div className={Styles.backgroundContainer}>
                <img src={require('../../imgs/background1.png')} alt="Background" className={Styles.responsiveImg} draggable="false"/>
            </div>
            <div className={Styles.container}>
                <form id="formcadastroaluno" className={Styles.form} autoComplete="off">
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
        </div>
    )
}


const Passo1 = ({ nextStep, email, setEmail, nome, setNome, rg, setRg, cpf, setCpf }) => (
    <div className={Styles.centro}>
        <div className={Styles.textcenter}>
          <h1>Dados do Aluno</h1>
        </div>
        <div className={Styles.container_inputs}>
            <Nome value={nome} setValue={setNome}/>
            <Email value={email} setValue={setEmail}/>

            <CPF />
            <Genero />

            <RG />
            <Telefone />

            <DtNasc />
            <DC />
            <br />
            <button type="button" onClick={() => {
            nextStep()
            calcularIdade(nascimento)
            }} className={Styles.button}>Avançar</button>
        </div>
    </div>
);

const Passo2 = ({ prevStep, nextStep, emailResp, setEmailResp, nomeResp, setNomeResp, rgResp, setRgResp, cpfResp, setCpfResp }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Dados do Responsável 1</h1>
    </div>
    <div className={Styles.container_inputs}>
        <Nome value={nomeResp} setValue={setNomeResp} />
        <Email value={emailResp} setValue={setEmailResp} />

        <CPF value={cpfResp} setValue={setCpfResp} />
        <Genero value={generoResp} setValue={setGeneroResp} />

        <RG value={rgResp} setValue={setRgResp} />
        <Telefone value={telefoneResp} setValue={setTelefoneResp} />

        <br />
        <button type="button" onClick={prevStep} className={Styles.button}>Voltar</button>
        <button type="button" onClick={cliquei} className={Styles.button}>Concluir</button>
    </div>
  </div>
);

// const Passo5 = ({ prevStep, telefoneResp, setTelefoneResp, nascimentoResp, setNascimentoResp, generoResp, setGeneroResp, cliquei }) => (
//   <div>
//     <div className={Styles.textcenter}>
//       <h1>Dados do Responsável</h1>
//     </div>
//     <div className={Styles.container_inputs}>
//       <Telefone value={telefoneResp} setValue={setTelefoneResp} />
//       <DtNasc value={nascimentoResp} setValue={setNascimentoResp} />
//       <Genero value={generoResp} setValue={setGeneroResp} />
//       <br />
//       <button type="button" onClick={prevStep} className={Styles.button}>Voltar</button>
//       <button type="button" onClick={cliquei} className={Styles.button}>Concluir</button>
//     </div>
//   </div>
// );