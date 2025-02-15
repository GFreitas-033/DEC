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
  const [selectedTurma, setSelectedTurma] = useState("");

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
      return Math.max(prevStep - 1, 0);
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
    axios.post('/api/unidade/cidade', {
      cidade: cidade
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
      tipo_aluno: 'escola',
    })



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
      mao_dominante={mao_dominante} setMao_Dominante={setMao_Dominante} calcularIdade={calcularIdade} setStep={setStep} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo2 nextStep={nextStep} prevStep={prevStep} nomeResp1={nomeResp1} setNomeResp1={setNomeResp1} emailResp1={emailResp1} setEmailResp1={setEmailResp1}
      cpfResp1={cpfResp1} setCpfResp1={setCpfResp1} generoResp1={generoResp1} setGeneroResp1={setGeneroResp1} rgResp1={rgResp1} setRgResp1={setRgResp1}
      telefoneResp1={telefoneResp1} setTelefoneResp1={setTelefoneResp1} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo3 nextStep={nextStep} prevStep={prevStep} cep={cep} setCep={setCep} logradouro={logradouro}
      bairro={bairro} cidade={cidade} uf={uf} numero={numero} setNumero={setNumero} handleBuscarCep={handleBuscarCep}
      nascimento={nascimento} calcularIdade={calcularIdade} setStep={setStep} areAllFieldsFilled={areAllFieldsFilled} pesquisarUnidades={pesquisarUnidades} />,

    <Passo4 nextStep={nextStep} prevStep={prevStep} selectedUnidade={selectedUnidade} setSelectedUnidade={setSelectedUnidade} unidades={unidades} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo5 nextStep={nextStep}  prevStep={prevStep}/>,
    
    <Passo6 nextStep={nextStep} prevStep={prevStep} selectedTurma={selectedTurma} setSelectedTurma={setSelectedTurma} turmas={turmas} cadastrar={cadastrar} />,
  ];

  return (
    <div>
      <div className={Styles.backgroundContainer}>
        <img src={require('../../imgs/backgroundDesktop/backTanger.png')} alt="Background" className={Styles.responsiveImg} draggable="false" />
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
            setStep(2); // Se maior de idade, pula para o passo 4
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
      <h1>Dados do Responsável</h1>
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

const Passo3 = ({ nextStep, prevStep, calcularIdade, setStep, nascimento, handleBuscarCep, cep, setCep, logradouro, bairro, cidade, uf, numero, setNumero, areAllFieldsFilled, pesquisarUnidades }) => (
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
        if (idade >= 18) {
          setStep(0); // Se maior de idade, pula para o passo 4
        } else {
          prevStep(); // Continua normalmente se menor de idade
        };
      }} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" onClick={() => {
        if (areAllFieldsFilled([cep, uf, cidade, bairro, logradouro, numero]) === true) {
          nextStep()
        } else {
          alert('Preencha os campos obrigatórios!');
        }
        pesquisarUnidades();
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo4 = ({ nextStep, prevStep, selectedUnidade, setSelectedUnidade, unidades, areAllFieldsFilled }) => (
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

const Passo5 = ({ nextStep, prevStep }) => (
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

const Passo6 = ({ prevStep, selectedTurma, setSelectedTurma, turmas, cadastrar }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Escolha a Sua Turma</h1>
    </div>
    <div className={Styles.container_Passo_Escolhas}>
      <div className={Styles.divSelect}>
        <select
          id="escolha_turma"
          name="escolha_turma"
          className={Styles.select}
          value={selectedTurma}
          onChange={(e) => setSelectedTurma(e.target.value)}
          disabled={!turmas.length} // Desabilita se não houver turmas disponíveis
        >
          <option value="" disabled>Selecionar Turma</option>
          {turmas.map(turma => (
            <option key={turma.id_turma} value={turma.id_turma}>
              {turma.nome_turma}
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
      <button type="button" className={Styles.button} onClick={cadastrar}>
        Finalizar Cadastro
        <img src={require('../../imgs/icons/verifica.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);