import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Styles from "./form.module.css";
import axios from "axios";

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

export default function Form() {
  const [step, setStep] = useState(0);
  // const [responsePessoa, setResponsePessoa] = useState(null);
  // let { id_aluno } = useParams();
  // const navigate = useNavigate();

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

  // States do Responsavel Financeiro
  const [son, setSon] = useState("");
  const [nomeFin, setNomeFin] = useState("");
  const [emailFin, setEmailFin] = useState("");
  const [cpfFin, setCpfFin] = useState("");
  const [generoFin, setGeneroFin] = useState("");
  const [rgFin, setRgFin] = useState("");
  const [telefoneFin, setTelefoneFin] = useState("");

  // States do Endereço
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");

  // States do Pagamento
  const [plano, setPlano] = useState("");
  const [d_Vencimento, setD_Vencimento] = useState("");

  // States de Unidades e Turmas
  const [unidades, setUnidades] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedUnidade, setSelectedUnidade] = useState("");
  const [selectedTurma, setSelectedTurma] = useState("");

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

  // useEffect(() => {
  //   if (id_aluno !== undefined) {
  //     logado();
  //     id_aluno = parseInt(id_aluno);
  //     preencherDados();
  //   }
  // }, [id_aluno]);

  async function pesquisarUnidades() {
    axios.post('/api/unidade/cidade/2tipo', {
      cidade: cidade,
      tipo1: 'dec',
      tipo2: 'particular'
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
      axios.get('/api/turma')
        .then(response => {
          const turmasFiltradas = response.data.filter(turma => turma.id_unidade === id_selectedUnidade);
          setTurmas(turmasFiltradas);
          setSelectedTurma(""); // Reseta a turma ao trocar de unidade
        })
        .catch(error => {
          console.error("Erro ao buscar turmas:", error);
        });
    } else {
      setTurmas([]);
      setSelectedTurma("");
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
    let idFin;
    let responsePessoa;

    if (nomeFin !== '' && cpfFin !== '' && rgFin !== '' && emailFin !== '' && telefoneFin !== '' && generoFin !== '') {
      responsePessoa = await axios.post('/api/pessoa', {
        nome_pessoa: nomeFin,
        dt_nasc_pessoa: '1999-01-01',
        cpf_pessoa: unformatCPF(cpfFin),
        rg_pessoa: unformatRG(rgFin),
        email_pessoa: emailFin,
        telefone_pessoa: unformatTelefone(telefoneFin),
        genero: generoFin,
        id_endereco: responseEndereco.id,
      });
      responsePessoa = responsePessoa.data;
      idFin = responsePessoa.id;
      let responseRespAluno = await axios.post('/api/responsavel_aluno', {
        id_pessoa: idFin
      });
    }

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
    if (cpfResp1 === '') {
      let responseAluno = await axios.post('/api/aluno', {
        id_pessoa: responsePessoa.id,
        destro_canhoto: mao_dominante,
        id_responsavel: idFin,
        dt_inicio: dataInicio,
        tipo_plano: plano,
        dia_pagamento: d_Vencimento,
        tipo_aluno: 'pagante',
      })
    } else {
      let responseAluno = await axios.post('/api/aluno', {
        id_pessoa: responsePessoa.id,
        destro_canhoto: mao_dominante,
        id_responsavel: idResp1,
        dt_inicio: dataInicio,
        tipo_plano: plano,
        dia_pagamento: d_Vencimento,
        tipo_aluno: 'pagante',
        id_responsavel2: idResp2,
      })
    }


    let responseAlunoHasTurma = await axios.post('/api/aluno_has_turma', {
      id_aluno: responsePessoa.id,
      id_turma: parseInt(selectedTurma)
    });

    if (responseAlunoHasTurma) {
      alert('Cadastro concluído!');
      window.location.reload();
    }

  }

  const steps = [
    <Passo1 nextStep={nextStep} nome={nome} setNome={setNome} email={email} setEmail={setEmail}
      cpf={cpf} setCpf={setCpf} genero={genero} setGenero={setGenero} rg={rg} setRg={setRg}
      telefone={telefone} setTelefone={setTelefone} nascimento={nascimento} setNascimento={setNascimento}
      mao_dominante={mao_dominante} setMao_Dominante={setMao_Dominante} calcularIdade={calcularIdade} setStep={setStep}
      areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo2 nextStep={nextStep} prevStep={prevStep} nomeResp1={nomeResp1} setNomeResp1={setNomeResp1} emailResp1={emailResp1}
      setEmailResp1={setEmailResp1} cpfResp1={cpfResp1} setCpfResp1={setCpfResp1} generoResp1={generoResp1} setGeneroResp1={setGeneroResp1}
      rgResp1={rgResp1} setRgResp1={setRgResp1} telefoneResp1={telefoneResp1} setTelefoneResp1={setTelefoneResp1} 
      areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo3 prevStep={prevStep} nomeResp2={nomeResp2} setNomeResp2={setNomeResp2} emailResp2={emailResp2} setEmailResp2={setEmailResp2}
      cpfResp2={cpfResp2} setCpfResp2={setCpfResp2} generoResp2={generoResp2} setGeneroResp2={setGeneroResp2} rgResp2={rgResp2} setRgResp2={setRgResp2}
      telefoneResp2={telefoneResp2} setTelefoneResp2={setTelefoneResp2} setStep={setStep} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo4 nextStep={nextStep} prevStep={prevStep} son={son} setSon={setSon} setStep={setStep} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo5 nextStep={nextStep} prevStep={prevStep} nomeFin={nomeFin} setNomeFin={setNomeFin} emailFin={emailFin} setEmailFin={setEmailFin}
      cpfFin={cpfFin} setCpfFin={setCpfFin} generoFin={generoFin} setGeneroFin={setGeneroFin} rgFin={rgFin} setRgFin={setRgFin}
      telefoneFin={telefoneFin} setTelefoneFin={setTelefoneFin} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo6 nextStep={nextStep} prevStep={prevStep} cep={cep} setCep={setCep} logradouro={logradouro}
      bairro={bairro} cidade={cidade} uf={uf} numero={numero} setNumero={setNumero} handleBuscarCep={handleBuscarCep}
      nascimento={nascimento} calcularIdade={calcularIdade} setStep={setStep} son={son} areAllFieldsFilled={areAllFieldsFilled} 
      pesquisarUnidades={pesquisarUnidades} />,

    <Passo7 nextStep={nextStep} prevStep={prevStep} unidades={unidades} selectedUnidade={selectedUnidade} setSelectedUnidade={setSelectedUnidade}
      areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo8 nextStep={nextStep} prevStep={prevStep} />,

    <Passo9 nextStep={nextStep} prevStep={prevStep} turmas={turmas} selectedTurma={selectedTurma} setSelectedTurma={setSelectedTurma} 
      areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo10 nextStep={nextStep} prevStep={prevStep} plano={plano} setPlano={setPlano} d_Vencimento={d_Vencimento} 
      setD_Vencimento={setD_Vencimento} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo11 prevStep={prevStep} cadastrar={cadastrar} areAllFieldsFilled={areAllFieldsFilled} aceitouContrato={aceitouContrato} 
      handleCheckboxChange={handleCheckboxChange} />,
  ];

  return (
    <div>
      <div className={Styles.backgroundContainer}>
        <img src={require('../../imgs/backgroundDesktop/backNormal.png')} 
          alt="Background" className={Styles.responsiveImg} id={Styles.backDesk} draggable="false" />
        <img src={require('../../imgs/backgroundMobile/backNormalMob.png')} 
          alt="Background" className={Styles.responsiveImg} id={Styles.backMob} draggable="false" />
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


const Passo1 = ({ nextStep, calcularIdade, setStep, nome, setNome, email, setEmail, cpf, setCpf, genero, setGenero, rg, setRg, telefone, setTelefone, nascimento, setNascimento, mao_dominante, setMao_Dominante, areAllFieldsFilled }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Dados do Aluno</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Nome value={nome} setValue={setNome} />
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
          alert('Preencha os campos obrigatórios!')
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
      <Nome value={nomeResp1} setValue={setNomeResp1} />
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
          alert('Preencha os campos obrigatórios!')
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
      <Nome value={nomeResp2} setValue={setNomeResp2} />
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
        setStep(5);
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo4 = ({ nextStep, prevStep, setStep, son, setSon }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Responsável Financeiro</h1>
    </div>
    <div className={Styles.checkboxContainer}>
      <label className={Styles.labelTextCenter}>Você será o Responsável Financeiro?</label>
      <div className={Styles.SimOuNao}>
        <input type="radio" id="sim" name="sim" value="sim" checked={son === 'sim'} onChange={(e) =>
          setSon(e.target.value)} />
        <label htmlFor="sim" className={Styles.escolha}>Sim</label>
        <input type="radio" id="nao" name="nao" value="nao" checked={son === 'nao'} onChange={(e) =>
          setSon(e.target.value)} />
        <label htmlFor="nao" className={Styles.escolha}>Não</label>
      </div>
    </div>
    <div className={Styles.divBotao}>
      <button type="button" onClick={prevStep} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" onClick={() => { 
        if(son === 'sim'){
          setStep(5);
        }else if(son === 'nao'){
          nextStep() 
        }
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo5 = ({ nextStep, prevStep, nomeFin, setNomeFin, emailFin, setEmailFin, cpfFin, setCpfFin, generoFin, setGeneroFin, rgFin, setRgFin, telefoneFin, setTelefoneFin }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Responsável Financeiro</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Nome value={nomeFin} setValue={setNomeFin} />
      <Email value={emailFin} setValue={setEmailFin} />
      <CPF value={cpfFin} setValue={setCpfFin} />
      <Genero value={generoFin} setValue={setGeneroFin} />
      <RG value={rgFin} setValue={setRgFin} />
      <Telefone value={telefoneFin} setValue={setTelefoneFin} />
    </div>
    <div className={Styles.divBotao}>
      <button type="button" onClick={prevStep} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" onClick={() => { nextStep() }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo6 = ({ nextStep, son, calcularIdade, setStep, nascimento, prevStep, handleBuscarCep, cep, setCep, logradouro, bairro, cidade, uf, numero, setNumero, areAllFieldsFilled, pesquisarUnidades }) => (
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
          if(son === 'sim'){
            setStep(3); 
          }else if(son === 'nao'){
            prevStep();
          }
        }
      }} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" onClick={() => {
        if (areAllFieldsFilled([cep, uf, cidade, bairro, logradouro, numero]) === true) {
          pesquisarUnidades();
          nextStep();
        } else {
          alert('Preencha os campos obrigatórios!');
        }
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo7 = ({ nextStep, prevStep, unidades, selectedUnidade, setSelectedUnidade, areAllFieldsFilled }) => (
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
          alert('Preencha os campos obrigatórios!');
        }
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo8 = ({ nextStep, prevStep }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Escolha os dias das<br /> aulas de Esgrima.</h1>
    </div>
    <div className={Styles.divCheckbox}>
      <div>
        <input type="checkbox" id="segunda" name="dias" value="segunda" />
        <label for="segunda">Segunda-feira</label>
      </div>
      <div>
        <input type="checkbox" id="terca" name="dias" value="terca" />
        <label for="terca">Terça-feira</label>
      </div>
      <div>
        <input type="checkbox" id="quarta" name="dias" value="quarta" />
        <label for="quarta">Quarta-feira</label>
      </div>
      <div>
        <input type="checkbox" id="quinta" name="dias" value="quinta" />
        <label for="quinta">Quinta-feira</label>
      </div>
      <div>
        <input type="checkbox" id="sexta" name="dias" value="sexta" />
        <label for="sexta">Sexta-feira</label>
      </div>
      <div>
        <input type="checkbox" id="sabado" name="dias" value="sabado" />
        <label for="sabado">Sábado</label>
      </div>
    </div>
    <div className={Styles.divBotao}>
      <button type="button" onClick={prevStep} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" onClick={() => {
        
          nextStep()
        
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo9 = ({ nextStep, prevStep, turmas, selectedTurma, setSelectedTurma, areAllFieldsFilled }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Escolha a Sua Turma</h1>
    </div>
    <div className={Styles.divEscolhaTurma}>
      {/* Checkboxes para selecionar a turma */}
      {turmas.length > 0 ? (
        turmas.map((turma) => (
          <div key={turma.id_turma} className={Styles.escolhaTurma}>
            <input
              type="checkbox"
              id={`turma-${turma.id_turma}`}
              name="escolha_turma"
              value={turma.id_turma}
              checked={selectedTurma === turma.id_turma} // Permite selecionar apenas um
              onChange={() => setSelectedTurma(turma.id_turma)} // Atualiza a seleção
            />
            <label htmlFor={`turma-${turma.id_turma}`}>{turma.nome_turma}</label>
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
        if (areAllFieldsFilled([selectedTurma]) === true) {
          nextStep()
        } else {
          alert('Preencha os campos obrigatórios!');
        }
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo10 = ({ nextStep, prevStep, plano, setPlano, d_Vencimento, setD_Vencimento }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Informações sobre<br/> Pagamento</h1>
    </div>
    <div className={Styles.container_Passo8}>
      <div className={Styles.divRadio}>
        <label className={Styles.labelTextCenter}>Qual será seu plano escolhido?</label>
        <div className={Styles.opcoes}>
          <input type="radio" id="mensal" name="plano" value="mensal" checked={plano === 'mensal'} onChange={(e) =>
            setPlano(e.target.value)} />
          <label htmlFor="mensal" className={Styles.escolha}>Pacote<br />Mensal</label>

          <input type="radio" id="semestral" name="plano" value="semestral" checked={plano === 'semestral'} onChange={(e) =>
            setPlano(e.target.value)} />
          <label htmlFor="semestral" className={Styles.escolha}>Pacote<br />6 meses</label>

          <input type="radio" id="anual" name="plano" value="anual" checked={plano === 'anual'} onChange={(e) =>
            setPlano(e.target.value)} />
          <label htmlFor="anual" className={Styles.escolha}>Pacote<br />12 meses</label>
        </div>
      </div>
      <div className={Styles.divRadio}>
        <label className={Styles.labelTextCenter}>Qual a melhor data para vencimento?</label>
        <div className={Styles.opcoes}>
          <input type="radio" id="10" name="data" value="10" checked={d_Vencimento === '10'} onChange={(e) =>
            setD_Vencimento(e.target.value)} />
          <label htmlFor="10" className={Styles.escolha}>10</label>
          <input type="radio" id="20" name="data" value="20" checked={d_Vencimento === '20'} onChange={(e) =>
            setD_Vencimento(e.target.value)} />
          <label htmlFor="20" className={Styles.escolha}>20</label>
          <input type="radio" id="30" name="data" value="30" checked={d_Vencimento === '30'} onChange={(e) =>
            setD_Vencimento(e.target.value)} />
          <label htmlFor="30" className={Styles.escolha}>30</label>
        </div>
      </div>
    </div>
    <div className={Styles.divBotao}>
      <button type="button" onClick={prevStep} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" onClick={() => {
        if (plano !== '' && d_Vencimento !== '') {
          nextStep()
        } else {
          alert('Preencha os campos obrigatórios!');
        }
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo11 = ({ prevStep, cadastrar, areAllFieldsFilled, aceitouContrato, handleCheckboxChange }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Contrato</h1>
    </div>
    <div className={Styles.divContrato}>
      <p className={Styles.contrato}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus optio provident dolores dolorum, quaerat odio
        maxime nulla impedit pariatur, repellat dolorem commodi rem! Vero aspernatur, molestiae ex perspiciatis optio magni.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus optio provident dolores dolorum, quaerat odio
        maxime nulla impedit pariatur, repellat dolorem commodi rem! Vero aspernatur, molestiae ex perspiciatis optio magni.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus optio provident dolores dolorum, quaerat odio
        maxime nulla impedit pariatur, repellat dolorem commodi rem! Vero aspernatur, molestiae ex perspiciatis optio magni.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus optio provident dolores dolorum, quaerat odio
        maxime nulla impedit pariatur, repellat dolorem commodi rem! Vero aspernatur, molestiae ex perspiciatis optio magni.
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
          alert('Leia e aceite o contrato para finalizar o cadastro');
        }
      }}>
        Finalizar Cadastro
        <img src={require('../../imgs/icons/verifica.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);