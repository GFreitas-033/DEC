import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import Swal from 'sweetalert2';

import Styles from "./form.module.css";

// Import Back
import Background from "../background/backCadastro/backCadastro";

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

function faltaCampo(){
  Swal.fire({
    title: 'Alerta!',
    text: 'Preencha os campo obrigatórios.',
    icon: 'warning',
    confirmButtonText: 'OK',
    confirmButtonColor: '#fbd034'
  })
}
function alertContrato(){
  Swal.fire({
    title: 'Alerta!',
    text: 'Leia e aceite o contrato para finalizar o cadastro.',
    icon: 'warning',
    confirmButtonText: 'OK',
    confirmButtonColor: '#fbd034'
  });
}

export default function Form() {
  const [step, setStep] = useState(0);

  // States do Aluno
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [rg, setRg] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [mao_dominante, setMao_Dominante] = useState("");

  const [vdd, setVdd] = useState(false);

  // States do 1° Responsavel
  const [nomeResp1, setNomeResp1] = useState("");
  const [emailResp1, setEmailResp1] = useState("");
  const [cpfResp1, setCpfResp1] = useState("");
  const [generoResp1, setGeneroResp1] = useState("");
  const [rgResp1, setRgResp1] = useState("");
  const [telefoneResp1, setTelefoneResp1] = useState("");

  // States do 2° Responsavel
  const [nomeResp2, setNomeResp2] = useState("");
  const [emailResp2, setEmailResp2] = useState("");
  const [cpfResp2, setCpfResp2] = useState("");
  const [generoResp2, setGeneroResp2] = useState("");
  const [rgResp2, setRgResp2] = useState("");
  const [telefoneResp2, setTelefoneResp2] = useState("");

  // States do Endereço
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");

  // States de Unidades e Turmas
  const [unidades, setUnidades] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedUnidade, setSelectedUnidade] = useState("");
  const [selectedTurmas, setSelectedTurmas] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  // State de contrato
  const [aceitouContrato, setAceitouContrato] = useState(false);

  const handleCheckboxChange = (event) => {
    setAceitouContrato(event.target.checked);
  };

  // Função para verificar se os campos foram preenchidos
  const areAllFieldsFilled = (fields) => {
    const emptyFields = Object.entries(fields)
      .filter(([key, value]) => value.trim() === "")
      .map(([key]) => key);

    if (emptyFields.length === 0) {
      return true;
    }

    return `Os seguintes campos estão vazios: ${emptyFields.join(", ")}`;
  };

  const nextStep = () => {
    setStep((prevStep) => {
      if (vdd) { // Maior de idade
        if (prevStep === 0) {
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
        if (prevStep === 3) {
          setVdd(false)
          return 0 // Voltar direto para o passo 1
        };
        return Math.max(prevStep - 1, 0);
      } else { // Menor de idade
        return Math.max(prevStep - 1, 0);
      }
    });
  };
  
  const handleChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleChangeTurmas = (turmaId) => {
    setSelectedTurmas((prev) => {
      if (prev.includes(turmaId)) {
        return prev.filter((id) => id !== turmaId); // Remove se já estiver selecionado
      } else if (prev.length < selectedDay) {
        return [...prev, turmaId]; // Adiciona se ainda houver espaço
      }
      return prev; // Mantém o mesmo estado se já atingiu o limite
    });
  };

  async function pesquisarUnidades() {
    axios.post('/api/unidade/cidade/1tipo', {
      cidade: cidade,
      tipo: 'dec'
    }).then(response => {
      setUnidades(response.data); // Define os dados no estado
    })
      .catch(error => {
        console.error("Erro ao buscar unidades:", error);
      });
  }

  useEffect(() => {
    if (selectedUnidade) {
      let id_selectedUnidade = parseInt(selectedUnidade);
      axios.get('/api/turma/formatada')
        .then(response => {
          const turmasFiltradas = response.data.filter(turma => turma.id_unidade === id_selectedUnidade);
          setTurmas(turmasFiltradas);
          setSelectedTurmas(""); // Reseta a turma ao trocar de unidade
        })
        .catch(error => {
          console.error("Erro ao buscar turmas:", error);
        });
    } else {
      setTurmas([]);
      setSelectedTurmas("");
    }
  }, [selectedUnidade]);

  const calcularIdade = (dataNascimento) => {
    const partes = dataNascimento.split('/');

    const hoje = new Date();
    const nascimento = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
    let idadeCalculada = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth();
    if (mes < nascimento.getMonth() || (mes === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())) {
      idadeCalculada--;
    }

    if (idadeCalculada < 18 && idadeCalculada > 0) {
      setVdd(false);
    } else {
      setVdd(true);
    }

    return idadeCalculada;
  };

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

  // Cadastro do aluno
  async function cadastrar() {

    const unformatCPF = (cpf) => {
      return cpf.replace(/\D/g, '');
    };
    const unformatTelefone = (telefone) => {
      return telefone.replace(/\D/g, '');
    };
    const unformatRG = (rg) => {
      return rg.replace(/\D/g, '');
    };
    const converterParaSQL = (dataBR) => {
      const [dia, mes, ano] = dataBR.split('/'); // Divide a string nos "/"
      return `${ano}-${mes}-${dia}`; // Reorganiza no formato SQL
    }

    function dataAtualSQL() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    let dataInicio = dataAtualSQL();

    let responseEndereco = await axios.post('/api/endereco', {
      cep: cep,
      estado: uf,
      cidade: cidade,
      bairro: bairro,
      rua: logradouro,
      numero: numero,
    });
    responseEndereco = responseEndereco.data;

    let idResp1;
    let idResp2;
    let responsePessoa;

    if (nomeResp1 !== '' && cpfResp1 !== '' && rgResp1 !== '' && emailResp1 !== '' && telefoneResp1 !== '' && generoResp1 !== '') {
      responsePessoa = await axios.post('/api/pessoa', {
        nome_pessoa: nomeResp1,
        dt_nasc_pessoa: '1999-01-01',
        cpf_pessoa: unformatCPF(cpfResp1),
        rg_pessoa: unformatRG(rgResp1),
        email_pessoa: emailResp1,
        telefone_pessoa: unformatTelefone(telefoneResp1),
        genero: generoResp1,
        id_endereco: responseEndereco.id,
      });
      responsePessoa = responsePessoa.data;
      idResp1 = responsePessoa.id;
      let responseRespAluno = await axios.post('/api/responsavel_aluno', {
        id_pessoa: idResp1
      });
    }


    if (nomeResp2 !== '' && cpfResp2 !== '' && rgResp2 !== '' && emailResp2 !== '' && telefoneResp2 !== '' && generoResp2 !== '') {
      responsePessoa = await axios.post('/api/pessoa', {
        nome_pessoa: nomeResp2,
        dt_nasc_pessoa: '1999-01-01',
        cpf_pessoa: unformatCPF(cpfResp2),
        rg_pessoa: unformatRG(rgResp2),
        email_pessoa: emailResp2,
        telefone_pessoa: unformatTelefone(telefoneResp2),
        genero: generoResp2,
        id_endereco: responseEndereco.id,
      });
      responsePessoa = responsePessoa.data;
      idResp2 = responsePessoa.id;
      let responseRespAluno = await axios.post('/api/responsavel_aluno', {
        id_pessoa: idResp2
      });
    }

    responsePessoa = await axios.post('/api/pessoa', {
      nome_pessoa: nome,
      dt_nasc_pessoa: converterParaSQL(nascimento),
      cpf_pessoa: unformatCPF(cpf),
      rg_pessoa: unformatRG(rg),
      email_pessoa: email,
      telefone_pessoa: unformatTelefone(telefone),
      genero: genero,
      id_endereco: responseEndereco.id,
    })
    responsePessoa = responsePessoa.data;

    let responseAluno = await axios.post('/api/aluno', {
      id_pessoa: responsePessoa.id,
      destro_canhoto: mao_dominante,
      id_responsavel: idResp1,
      dt_inicio: dataInicio,
      tipo_aluno: 'naoPagante',
      id_responsavel2: idResp2,
    })



    let responseAlunoHasTurma;
    for(let i=0;i<selectedDay;i++){
      responseAlunoHasTurma = await axios.post('/api/aluno_has_turma', {
        id_aluno: responsePessoa.id,
        id_turma: parseInt(selectedTurmas[i])
      });
    }
    

    if (responseAlunoHasTurma) {
      alert('Cadastro concluído!');
      window.location.reload();
    }

  }

  const steps = [
    <Passo1 nextStep={nextStep} nome={nome} setNome={setNome} email={email} setEmail={setEmail}
      cpf={cpf} setCpf={setCpf} genero={genero} setGenero={setGenero} rg={rg} setRg={setRg}
      telefone={telefone} setTelefone={setTelefone} nascimento={nascimento} setNascimento={setNascimento}
      mao_dominante={mao_dominante} setMao_Dominante={setMao_Dominante} calcularIdade={calcularIdade} setStep={setStep} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo2 nextStep={nextStep} prevStep={prevStep} nomeResp1={nomeResp1} setNomeResp1={setNomeResp1} emailResp1={emailResp1} setEmailResp1={setEmailResp1}
      cpfResp1={cpfResp1} setCpfResp1={setCpfResp1} generoResp1={generoResp1} setGeneroResp1={setGeneroResp1} rgResp1={rgResp1} setRgResp1={setRgResp1}
      telefoneResp1={telefoneResp1} setTelefoneResp1={setTelefoneResp1} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo3 prevStep={prevStep} nomeResp2={nomeResp2} setNomeResp2={setNomeResp2} emailResp2={emailResp2} setEmailResp2={setEmailResp2}
      cpfResp2={cpfResp2} setCpfResp2={setCpfResp2} generoResp2={generoResp2} setGeneroResp2={setGeneroResp2} rgResp2={rgResp2} setRgResp2={setRgResp2}
      telefoneResp2={telefoneResp2} setTelefoneResp2={setTelefoneResp2} setStep={setStep} />,

    <Passo5 nextStep={nextStep} prevStep={prevStep} cep={cep} setCep={setCep} logradouro={logradouro}
      bairro={bairro} cidade={cidade} uf={uf} numero={numero} setNumero={setNumero} handleBuscarCep={handleBuscarCep}
      nascimento={nascimento} calcularIdade={calcularIdade} setStep={setStep} areAllFieldsFilled={areAllFieldsFilled} pesquisarUnidades={pesquisarUnidades} />,

    <Passo6 nextStep={nextStep} prevStep={prevStep} unidades={unidades} setSelectedUnidade={setSelectedUnidade} selectedUnidade={selectedUnidade} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo7 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} selectedDay={selectedDay} areAllFieldsFilled={areAllFieldsFilled}/>,

    <Passo8 nextStep={nextStep} prevStep={prevStep} turmas={turmas} selectedTurmas={selectedTurmas} setSelectedTurmas={setSelectedTurmas} 
    areAllFieldsFilled={areAllFieldsFilled} handleChangeTurmas={handleChangeTurmas}/>,

    <Passo9 prevStep={prevStep} cadastrar={cadastrar} aceitouContrato={aceitouContrato} handleCheckboxChange={handleCheckboxChange} />,
  ];

  return (
    <div>
      <Background />
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


const Passo1 = ({ nextStep, calcularIdade, setStep, nome, setNome, email, setEmail, cpf, setCpf, genero, setGenero, rg, setRg, telefone, setTelefone, nascimento, setNascimento, mao_dominante, setMao_Dominante, areAllFieldsFilled }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Dados do Aluno</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Nome value={nome} setValue={setNome}  texto={"Aluno"} />
      <Email value={email} setValue={setEmail} />

      <CPF value={cpf} setValue={setCpf} />
      <Genero value={genero} setValue={setGenero} />

      <RG value={rg} setValue={setRg} />
      <Telefone value={telefone} setValue={setTelefone} />

      <DtNasc value={nascimento} setValue={setNascimento} />
      <DC value={mao_dominante} setValue={setMao_Dominante} />

      <button type="button" onClick={() => {
        let camposPreenchidos = areAllFieldsFilled([nome, email, cpf, genero, rg, telefone, nascimento, mao_dominante])
        if (camposPreenchidos === true) {
          let idade = calcularIdade(nascimento); // Garante que a idade seja calculada
          if (idade >= 18) {
            setStep(3); // Se maior de idade, pula para o passo 4
          } else {
            nextStep(); // Continua normalmente se menor de idade
          };
        } else {
          faltaCampo();
        }
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo2 = ({ nextStep, prevStep, nomeResp1, setNomeResp1, emailResp1, setEmailResp1, cpfResp1, setCpfResp1, generoResp1, setGeneroResp1, rgResp1, setRgResp1, telefoneResp1, setTelefoneResp1, areAllFieldsFilled }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Dados do Responsável 1</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Nome value={nomeResp1} setValue={setNomeResp1} texto={"Responsável"} />
      <Email value={emailResp1} setValue={setEmailResp1} />
      <CPF value={cpfResp1} setValue={setCpfResp1} />
      <Genero value={generoResp1} setValue={setGeneroResp1} />
      <RG value={rgResp1} setValue={setRgResp1} />
      <Telefone value={telefoneResp1} setValue={setTelefoneResp1} />
    </div>
    <div className={Styles.divBotao}>
      <button type="button" onClick={prevStep} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" onClick={() => {
        if (areAllFieldsFilled([nomeResp1, emailResp1, cpfResp1, generoResp1, rgResp1, telefoneResp1]) === true) {
          nextStep()
        } else {
          faltaCampo();
        }
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo3 = ({ setStep, prevStep, nomeResp2, setNomeResp2, emailResp2, setEmailResp2, cpfResp2, setCpfResp2, generoResp2, setGeneroResp2, rgResp2, setRgResp2, telefoneResp2, setTelefoneResp2 }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Dados do Responsável 2</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Nome value={nomeResp2} setValue={setNomeResp2} texto={"Responsável"} />
      <Email value={emailResp2} setValue={setEmailResp2} />
      <CPF value={cpfResp2} setValue={setCpfResp2} />
      <Genero value={generoResp2} setValue={setGeneroResp2} />
      <RG value={rgResp2} setValue={setRgResp2} />
      <Telefone value={telefoneResp2} setValue={setTelefoneResp2} />
    </div>
    <div className={Styles.divBotao}>
      <button type="button" onClick={prevStep} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" onClick={() => {
        setStep(3);
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo5 = ({ nextStep, calcularIdade, setStep, nascimento, prevStep, handleBuscarCep, cep, setCep, logradouro, bairro, cidade, uf, numero, setNumero, areAllFieldsFilled, pesquisarUnidades }) => (
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
    </div>
    <div className={Styles.divBotao}>
      <button type="button" onClick={() => {
        let idade = calcularIdade(nascimento); // Garante que a idade seja calculada
        if (idade < 18) {
          setStep(2); // Se menor de idade, pula para o passo 3
        } else {
          prevStep(); // Continua normalmente se maior de idade
        }
      }} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" onClick={() => {
        if (areAllFieldsFilled([cep, uf, cidade, bairro, logradouro, numero]) === true) {
          pesquisarUnidades();
          nextStep()
        } else {
          faltaCampo();
        }
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo6 = ({ nextStep, prevStep, selectedUnidade, setSelectedUnidade, unidades, areAllFieldsFilled }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Escolha a Sua Unidade</h1>
    </div>
    <div className={Styles.container_Passo_Escolhas}>
      <div className={Styles.divSelect}>
        <select
          id="escolha_unidade"
          name="escolha_unidade"
          className={Styles.select}
          value={selectedUnidade}
          onChange={(e) => setSelectedUnidade(e.target.value)}
        >
          <option value="" disabled>Selecionar Unidade</option>
          {unidades.map(unidade => (
            <option key={unidade.id_unidade} value={unidade.id_unidade}>
              {unidade.nome_unidade}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className={Styles.divBotao}>
      <button type="button" onClick={prevStep} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" onClick={() => {
        if (areAllFieldsFilled([selectedUnidade]) === true) {
          nextStep()
        } else {
          faltaCampo();
        }
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo7 = ({ nextStep, prevStep, handleChange, selectedDay, areAllFieldsFilled}) => (
  <div className={Styles.centro}>
      <div className={Styles.textcenter}>
        <h1>Quantos dias por semana<br />Você vai Treinar?</h1>
      </div>
      <div className={Styles.divEscolhaDia}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num}>
            <input 
              type="radio" 
              id={num.toString()} 
              name="dia" 
              value={num} 
              checked={selectedDay === num.toString()} 
              onChange={handleChange} 
            />
            <label htmlFor={num.toString()}>{num} Dia{num > 1 ? "s" : ""}</label>
          </div>
        ))}
      </div>
      <div className={Styles.divBotao}>
        <button type="button" onClick={prevStep} className={Styles.button}>
          <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
          Anterior
        </button>
        <button type="button" onClick={() => {
            if(areAllFieldsFilled([selectedDay]) === true){
              nextStep();
            }else{
              faltaCampo();
            }
          
          }} className={Styles.button}>
          Próximo
          <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        </button>
      </div>
    </div>
);

const Passo8 = ({ nextStep, prevStep, turmas, selectedTurmas, setSelectedTurmas, areAllFieldsFilled, handleChangeTurmas }) => (
  <div className={Styles.centro}>
      <div className={Styles.textcenter}>
        <h1>Escolha a Sua Turma</h1>
      </div>
      <div className={Styles.divEscolhaTurma}>
        {turmas.length > 0 ? (
          turmas.map((turma) => (
            <div key={turma.id_turma} className={Styles.escolhaTurma}>
              <input
                type="checkbox"
                id={`turma-${turma.id_turma}`}
                name="escolha_turma"
                value={turma.id_turma}
                checked={selectedTurmas.includes(turma.id_turma)}
                onChange={() => handleChangeTurmas(turma.id_turma)}
              />
              <label htmlFor={`turma-${turma.id_turma}`}>{turma.nome_formatado}</label>
            </div>
          ))
        ) : (
          <p>Nenhuma turma disponível.</p>
        )}
      </div>
      <div className={Styles.divBotao}>
        <button type="button" onClick={prevStep} className={Styles.button}>
          <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
          Anterior
        </button>
        <button type="button" onClick={() => {
          if(selectedTurmas !== ''){
            nextStep();
          }else{
            faltaCampo();
          }
        }} className={Styles.button}>
          Próximo
          <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        </button>
      </div>
    </div>
);

const Passo9 = ({ prevStep, cadastrar, aceitouContrato, handleCheckboxChange }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Contrato</h1>
    </div>
    <div className={Styles.divContrato}>
      <p className={Styles.contrato}>
        <b>TERMO DE COMPROMISSO</b><br /><br />
        DOURADO ESGRIMA CLUB<br /><br />
        O Dourado Esgrima Club, em parceria com escolas participantes do programa Esgrima Escolar, 
        oferece a oportunidade para alunos selecionados participarem dos treinamentos nas unidades do clube, 
        como forma de desenvolvimento esportivo e educacional.<br /><br />
        Por meio deste termo, o responsável legal do aluno compromete-se a:<br /><br />
        * Garantir a presença do aluno nos treinamentos regulares conforme cronograma estabelecido pela unidade do
         Dourado Esgrima Club.<br />
        * Informar previamente qualquer impossibilidade de comparecimento, justificando as faltas quando necessário.<br />
        * Zelar pelo compromisso esportivo do aluno, incentivando a disciplina, responsabilidade e respeito às 
        regras do clube.<br />
        * Cumprir os regulamentos internos do Dourado Esgrima Club, respeitando os profissionais e 
        demais participantes.<br />
        * Providenciar o transporte do aluno para os treinamentos e competições, caso aplicável.<br />
        * Autorizar o uso de imagem do aluno para divulgação das atividades do projeto em redes sociais e 
        materiais institucionais do clube.<br /><br />
        <u>Declaro estar ciente</u> de que o não cumprimento destes compromissos pode resultar na perda da 
        vaga do aluno no programa de treinamentos do Dourado Esgrima Club.
        <div className={Styles.contratoContainer}>
          <input type="checkbox" id="aceitarContrato" checked={aceitouContrato} onChange={handleCheckboxChange} />
          <label htmlFor="aceitarContrato">Estou ciente e concordo.</label>
        </div>
      </p>
    </div>
    <div className={Styles.divBotao}>
      <button type="button" onClick={prevStep} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" className={Styles.button} onClick={() => {
        if (aceitouContrato === true) {
          cadastrar();
        } else {
          alertContrato();
        }
      }}>
        Finalizar Cadastro
        <img src={require('../../imgs/icons/verifica.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);