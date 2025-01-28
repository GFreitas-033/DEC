import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Styles from "./form.module.css";
// import axios from "axios";

// Import dos Input
import Nome from "../inputs_cadastro/nome_input";
import Email from "../inputs_cadastro/email_input";
import CPF from "../inputs_cadastro/cpf_input";
import Genero from "../inputs_cadastro/genero_input";
import RG from "../inputs_cadastro/rg_input";
import Telefone from "../inputs_cadastro/telefone_input";
import DtNasc from "../inputs_cadastro/dt_nasc_input";
import DC from "../inputs_cadastro/destro_canhoto_input";

// Import dos Input de Endereço
import Cep from "../inputs_cadastro/endereco/cep_input";
import UF from "../inputs_cadastro/endereco/uf_input";
import Cidade from "../inputs_cadastro/endereco/cidade_input";
import Bairro from "../inputs_cadastro/endereco/bairro_input";
import Rua from "../inputs_cadastro/endereco/rua_input";
import Numero from "../inputs_cadastro/endereco/numero_input";

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

  const [vdd, setVdd] = useState(false);

  const [nomeResp1, setNomeResp1] = useState("");
  const [emailResp1, setEmailResp1] = useState("");
  const [cpfResp1, setCpfResp1] = useState("");
  const [generoResp1, setGeneroResp1] = useState("");
  const [rgResp1, setRgResp1] = useState("");   
  const [telefoneResp1, setTelefoneResp1] = useState("");

  const [nomeResp2, setNomeResp2] = useState("");
  const [emailResp2, setEmailResp2] = useState("");
  const [cpfResp2, setCpfResp2] = useState("");
  const [generoResp2, setGeneroResp2] = useState("");
  const [rgResp2, setRgResp2] = useState("");   
  const [telefoneResp2, setTelefoneResp2] = useState("");

  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");
  const [id_endereco, setEndereco] = useState(null); 

  const nextStep = () => {
    setStep((prevStep) => {
      if (vdd) { // Maior de idade
        if (prevStep === 0){
          setVdd(false)
          return 3 // Pular passos 2 e 3
        }; 
        return Math.min(prevStep + 1, steps.length - 1);
      } else { // Menor de idade
        return Math.min(prevStep + 1, steps.length - 1);
      }
    });
  };
    
  const prevStep = () => {
    setStep((prevStep) => {
      if (vdd) { // Maior de idade
        if (prevStep === 3){
          setVdd(false)
          return 0 // Voltar direto para o passo 1
        };
        return Math.max(prevStep - 1, 0);
      } else { // Menor de idade
        return Math.max(prevStep - 1, 0);
      }
    });
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

    if(idadeCalculada < 18 && idadeCalculada > 0){
      setVdd(false);
    }else{
      setVdd(true);
    }

    return idadeCalculada;
  };

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
        mao_dominante={mao_dominante} setMao_Dominante={setMao_Dominante}  calcularIdade={calcularIdade} setStep={setStep} />,
      
      <Passo2 nextStep={nextStep} prevStep={prevStep} nomeResp1={nomeResp1} setNomeResp1={setNomeResp1} emailResp1={emailResp1} setEmailResp1={setEmailResp1} 
        cpfResp1={cpfResp1} setCpfResp1={setCpfResp1} generoResp1={generoResp1} setGeneroResp1={setGeneroResp1} rgResp1={rgResp1} setRgResp1={setRgResp1}
        telefoneResp1={telefoneResp1} setTelefoneResp1={setTelefoneResp1} />,
      
      <Passo3 nextStep={nextStep} prevStep={prevStep} nomeResp2={nomeResp2} setNomeResp2={setNomeResp2} emailResp2={emailResp2} setEmailResp2={setEmailResp2} 
          cpfResp2={cpfResp2} setCpfResp2={setCpfResp2} generoResp2={generoResp2} setGeneroResp2={setGeneroResp2} rgResp2={rgResp2} setRgResp2={setRgResp2}
          telefoneResp2={telefoneResp2} setTelefoneResp2={setTelefoneResp2} />,
      
      <Passo4 nextStep={nextStep} prevStep={prevStep} cep={cep} setCep={setCep} logradouro={logradouro} 
          bairro={bairro} cidade={cidade} uf={uf} numero={numero} setNumero={setNumero} handleBuscarCep={handleBuscarCep} />,
      
      <Passo5 nextStep={nextStep} prevStep={prevStep} />,

      <Passo6 nextStep={nextStep} prevStep={prevStep} />,

      <Passo7 nextStep={nextStep} prevStep={prevStep} />,

      <Passo8 prevStep={prevStep} />,
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


const Passo1 = ({ nextStep, calcularIdade, setStep, nome, setNome, email, setEmail, cpf, setCpf, genero, setGenero, rg, setRg, telefone, setTelefone, nascimento, setNascimento, mao_dominante, setMao_Dominante }) => (
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
        let idade = calcularIdade(nascimento); // Garante que a idade seja calculada
        if (idade > 18) {
          setStep(3); // Se maior de idade, pula para o passo 4
        } else {
          nextStep(); // Continua normalmente se menor de idade
        }
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false"/>
      </button>
    </div>
  </div>
);

const Passo2 = ({ nextStep, prevStep, nomeResp1, setNomeResp1, emailResp1, setEmailResp1, cpfResp1, setCpfResp1, generoResp1, setGeneroResp1, rgResp1, setRgResp1, telefoneResp1, setTelefoneResp1 }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Dados do Responsável 1</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Nome value={nomeResp1} setValue={setNomeResp1} />
      <Email value={emailResp1} setValue={setEmailResp1} />

      <CPF value={cpfResp1} setValue={setCpfResp1} />
      <Genero value={generoResp1} setValue={setGeneroResp1} />

      <RG value={rgResp1} setValue={setRgResp1} />
      <Telefone value={telefoneResp1} setValue={setTelefoneResp1} />

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

const Passo3 = ({ nextStep, prevStep, nomeResp2, setNomeResp2, emailResp2, setEmailResp2, cpfResp2, setCpfResp2, generoResp2, setGeneroResp2, rgResp2, setRgResp2, telefoneResp2, setTelefoneResp2 }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Dados do Responsável 2</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Nome value={nomeResp2} setValue={setNomeResp2} />
      <Email value={emailResp2} setValue={setEmailResp2} />

      <CPF value={cpfResp2} setValue={setCpfResp2} />
      <Genero value={generoResp2} setValue={setGeneroResp2} />

      <RG value={rgResp2} setValue={setRgResp2} />
      <Telefone value={telefoneResp2} setValue={setTelefoneResp2} />

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

const Passo4 = ({ nextStep, prevStep, handleBuscarCep, cep, setCep, logradouro, bairro, cidade, uf, numero, setNumero }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Endereço</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Cep onBuscarCep={handleBuscarCep} value={cep} setValue={setCep} />
      <UF u={uf} />

      <Cidade c={cidade} />
      <Bairro b={bairro} />

      <Rua r={logradouro} />
      <Numero value={numero} setValue={setNumero} />
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

const Passo5 = ({ nextStep, prevStep }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Informações sobre o Pagamento</h1>
    </div>
    <div className={Styles.container_Passo5}>

      <div className={Styles.divRadio}>
        <label className={Styles.labelTextCenter}>Qual será seu plano escolhido?</label>
        <div className={Styles.opcoes}>
          <input type="radio" id="mensal" name="plano" value="mensal" />
          <label htmlFor="mensal" className={Styles.escolha}>Mensal</label>

          <input type="radio" id="semestral" name="plano" value="semestral" />
          <label htmlFor="semestral" className={Styles.escolha}>Semestral</label>

          <input type="radio" id="anual" name="plano" value="anual" />
          <label htmlFor="anual" className={Styles.escolha}>Anual</label>
        </div>
      </div>

      <div className={Styles.divRadio}>
        <label className={Styles.labelTextCenter}>Qual a melhor data para vencimento?</label>
        <div className={Styles.opcoes}>
          <input type="radio" id="10" name="data" value="10" />
          <label htmlFor="10" className={Styles.escolha}>10</label>
  
          <input type="radio" id="20" name="data" value="20" />
          <label htmlFor="20" className={Styles.escolha}>20</label>
  
          <input type="radio" id="30" name="data" value="30" />
          <label htmlFor="30" className={Styles.escolha}>30</label>
        </div>
      </div>

      <div className={Styles.divBotoes}>
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
  </div>
);

const Passo6 = ({ nextStep, prevStep }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Escolha a Sua Unidade</h1>
    </div>
    <div className={Styles.container_Passo_Escolhas}>

      <div className={Styles.divSelect}>
        <select id="escolha_unidade" name="escolha_unidade" className={Styles.select}>
          <option value="" selected disabled>Selecionar</option>
          <option value="unidade1">Unidade 1</option>
          <option value="unidade2">Unidade 2</option>
          <option value="unidade3">Unidade 3</option>
          <option value="unidade4">Unidade 4</option>
          <option value="unidade5">Unidade 5</option>
          <option value="unidade6">Unidade 6</option>
        </select>
      </div>

      <div className={Styles.divBotoes}>
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
  </div>
);

const Passo7 = ({ nextStep, prevStep }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Escolha a Sua Turma</h1>
    </div>
    <div className={Styles.container_Passo_Escolhas}>

      <div className={Styles.divRadio}>
        <div className={Styles.opcoes}>
          <input type="radio" id="turma1" name="turma" value="t1" />
          <label htmlFor="turma1" className={Styles.escolha}>Turma 1</label>

          <input type="radio" id="turma2" name="turma" value="t2" />
          <label htmlFor="turma2" className={Styles.escolha}>Turma 2</label>

          <input type="radio" id="turma3" name="turma" value="t3" />
          <label htmlFor="turma3" className={Styles.escolha}>Turma 3</label>

          <input type="radio" id="turma4" name="turma" value="t4" />
          <label htmlFor="turma4" className={Styles.escolha}>Turma 4</label>

          <input type="radio" id="turma5" name="turma" value="t5" />
          <label htmlFor="turma5" className={Styles.escolha}>Turma 5</label>

          <input type="radio" id="turma6" name="turma" value="t6" />
          <label htmlFor="turma6" className={Styles.escolha}>Turma 6</label>
        </div>
      </div>

      <div className={Styles.divBotoes}>
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
  </div>
);

const Passo8 = ({ prevStep }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Contrato</h1>
    </div>
    <div className={Styles.container_inputs}>

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