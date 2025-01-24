import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Styles from "./form.module.css";
// import axios from "axios";

// // Import dos Input
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
    // const [responsePessoa, setResponsePessoa] = useState(null);
    // let { id_aluno } = useParams();
    // const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [genero, setGenero] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [mao_dominante, setMao_Dominante] = useState("");

    const [idade, setIdade] = useState("");

    const [nomeResp, setNomeResp] = useState("");
    const [emailResp, setEmailResp] = useState("");
    const [cpfResp, setCpfResp] = useState("");
    const [generoResp, setGeneroResp] = useState("");
    const [rgResp, setRgResp] = useState("");   
    const [telefoneResp, setTelefoneResp] = useState("");

    // const [cep, setCep] = useState("");
    // const [logradouro, setLogradouro] = useState("");
    // const [bairro, setBairro] = useState("");
    // const [cidade, setCidade] = useState("");
    // const [uf, setUf] = useState("");
    // const [id_endereco, setEndereco] = useState(null);    

    const nextStep = () => {
        setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    };
        
    const prevStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0));
    };
        




    // useEffect(() => {
    //   if (id_aluno !== undefined) {
    //     logado();
    //     id_aluno = parseInt(id_aluno);
    //     preencherDados();
    //   }
    // }, [id_aluno]);

    const calcularIdade = (dataNascimento) => {
        const partes = dataNascimento.split('/');
        
        const hoje = new Date();
        const nascimento = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
        let idadeCalculada = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth();
        if (mes < nascimento.getMonth() || (mes === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())) {
          idadeCalculada--;
        }
        setIdade(idadeCalculada);
    };
    const isUnder18 = () => {
      console.log("Idade do aluno:", idade);  // Adicione este log para depuração
      return idade < 18 && idade > 0;
    }

    // const formatCPF = (cpf) => {
    //     return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    // };

    // const formatRG = (rg) => {
    //     return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    // };

    // function padraoBR(isoDate) {
    //   const date = new Date(isoDate);
    //   const day = String(date.getUTCDate()).padStart(2, '0');
    //   const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Meses começam em 0
    //   const year = date.getUTCFullYear();
    //   return `${day}/${month}/${year}`;
    // }

    // const formatTelefone = (telefone) => {
    //   telefone = telefone.replace(/\D/g, ''); // Remove non-digits
    //   if (telefone.length === 11) {
    //     return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    //   } else if (telefone.length === 10) {
    //     return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    //   }
    //   return telefone;
    // };

    // const formatDate = (nascimento) => {
    //   nascimento = nascimento.replace(/\D/g, '');
    //   nascimento = nascimento.replace(/(\d{2})(\d{2})(\d)/, '$1/$2/$3');
    //   return nascimento;
    // }

    // const convertDate = (date) => {
    //   const [day, month, year] = date.split('/');
    //   return `${year}-${month}-${day}`;
    // };

//   const handleBuscarCep = (cep) => {
//     if (cep.length < 9) {
//       setLogradouro("");
//       setBairro("");
//       setCidade("");
//       setUf("");
//       return;
//     }
//     fetch(`https://viacep.com.br/ws/${cep}/json/`)
//       .then((response) => response.json())
//       .then((dados) => {
//         setLogradouro(dados.logradouro);
//         setBairro(dados.bairro);
//         setCidade(dados.localidade);
//         setUf(dados.uf);
//       })
//       .catch((error) => {
//         console.error('Erro ao buscar CEP:', error);
//       });
//   };

    // const logado = async () => {
    //   try {
    //     let response = await axios.post('/login');
    //     if (response.data.adm !== 1) {
    //       navigate('/home');
    //     }
    //   } catch (error) {
    //     navigate('/');
    //   }
    // };

    // function tratamentoString(inputString) {
    //   return inputString.replace(/[.\-()\s]/g, '');
    // }

    // Obter a data atual
    // const dataAtual = new Date();
    // const adicionarZero = (numero) => (numero < 10 ? `0${numero}` : numero);
    // const ano = dataAtual.getFullYear();
    // const mes = adicionarZero(dataAtual.getMonth() + 1);
    // const dia = adicionarZero(dataAtual.getDate());
    // const dataFormatadaMySQL = `${ano}-${mes}-${dia}`;

    const steps = [
        <Passo1 nextStep={nextStep} nome={nome} setNome={setNome} email={email} setEmail={setEmail} 
          cpf={cpf} setCpf={setCpf} genero={genero} setGenero={setGenero} rg={rg} setRg={setRg} 
          telefone={telefone} setTelefone={setTelefone} nascimento={nascimento} setNascimento={setNascimento} 
          mao_dominante={mao_dominante} setMao_Dominante={setMao_Dominante}  calcularIdade={calcularIdade}/>,
        <Passo2 nextStep={nextStep} prevStep={prevStep} nomeResp={nomeResp} setNomeResp={setNomeResp} emailResp={emailResp} setEmailResp={setEmailResp} 
          cpfResp={cpfResp} setCpfResp={setCpfResp} generoResp={generoResp} setGeneroResp={setGeneroResp} rgResp={rgResp} setRgResp={setRgResp}
          telefoneResp={telefoneResp} setTelefoneResp={setTelefoneResp} />,
        <Passo3 prevStep={prevStep} nomeResp={nomeResp} setNomeResp={setNomeResp} emailResp={emailResp} setEmailResp={setEmailResp} 
        cpfResp={cpfResp} setCpfResp={setCpfResp} generoResp={generoResp} setGeneroResp={setGeneroResp} rgResp={rgResp} setRgResp={setRgResp}
        telefoneResp={telefoneResp} setTelefoneResp={setTelefoneResp} />,
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


const Passo1 = ({ nextStep, calcularIdade, nome, setNome, email, setEmail, cpf, setCpf, genero, setGenero, rg, setRg, telefone, setTelefone, nascimento, setNascimento, mao_dominante, setMao_Dominante}) => (
    <div className={Styles.centro}>
        <div className={Styles.textcenter}>
          <h1>Dados do Aluno</h1>
        </div>
        <div className={Styles.container_inputs}>
            <Nome value={nome} setValue={setNome}/>
            <Email value={email} setValue={setEmail}/>

            <CPF value={cpf} setValue={setCpf}/>
            <Genero value={genero} setValue={setGenero}/>

            <RG value={rg} setValue={setRg}/>
            <Telefone value={telefone} setValue={setTelefone}/>

            <DtNasc value={nascimento} setValue={setNascimento}/>
            <DC value={mao_dominante} setValue={setMao_Dominante}/>
            
            <button type="button" onClick={() => {
                nextStep()
                calcularIdade(nascimento)
            }} className={Styles.button}>
                Próximo
                <img src={require('../../imgs/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false"/>
            </button>
        </div>
    </div>
);

const Passo2 = ({ nextStep, prevStep, nomeResp, setNomeResp, emailResp, setEmailResp, cpfResp, setCpfResp, generoResp, setGeneroResp, rgResp, setRgResp, telefoneResp, setTelefoneResp}) => (
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

        <button type="button" onClick={prevStep} className={Styles.button}>
            <img src={require('../../imgs/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false"/>
            Anterior
        </button>
        <button type="button" onClick={() => {nextStep()}} className={Styles.button}>
            Próximo
            <img src={require('../../imgs/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false"/>
        </button>
    </div>
  </div>
);

const Passo3 = ({ prevStep, nomeResp, setNomeResp, emailResp, setEmailResp, cpfResp, setCpfResp, generoResp, setGeneroResp, rgResp, setRgResp, telefoneResp, setTelefoneResp}) => (
    <div className={Styles.centro}>
      <div className={Styles.textcenter}>
        <h1>Dados do Responsável 2</h1>
      </div>
      <div className={Styles.container_inputs}>
          <Nome value={nomeResp} setValue={setNomeResp} />
          <Email value={emailResp} setValue={setEmailResp} />
  
          <CPF value={cpfResp} setValue={setCpfResp} />
          <Genero value={generoResp} setValue={setGeneroResp} />
  
          <RG value={rgResp} setValue={setRgResp} />
          <Telefone value={telefoneResp} setValue={setTelefoneResp} />
  
          <button type="button" onClick={prevStep} className={Styles.button}>
              <img src={require('../../imgs/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false"/>
              Anterior
          </button>
          <button type="button"  className={Styles.button}>
              Finalizar Cadastro
              <img src={require('../../imgs/verifica.png')} alt="icon" className={Styles.iconNavegar} draggable="false"/>
          </button>
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