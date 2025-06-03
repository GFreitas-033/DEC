import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import Swal from "sweetalert2";

import Styles from "./form.module.css";

// Import Back
import Background from "../background/BackCadastro";

// Import dos Input
import Nome from "../inputs-cadastro/Nome";
import Email from "../inputs-cadastro/Email";
import CPF from "../inputs-cadastro/Cpf";
import Genero from "../inputs-cadastro/Genero";
import RG from "../inputs-cadastro/Rg";
import Telefone from "../inputs-cadastro/Telefone";
import DtNasc from "../inputs-cadastro/DtNasc";
import DC from "../inputs-cadastro/DestroCanhoto";

// Import dos Input de Endereço
import Cep from "../inputs-cadastro/endereco/Cep";
import UF from "../inputs-cadastro/endereco/Uf";
import Cidade from "../inputs-cadastro/endereco/Cidade";
import Bairro from "../inputs-cadastro/endereco/Bairro";
import Rua from "../inputs-cadastro/endereco/Rua";
import Numero from "../inputs-cadastro/endereco/Numero";

//import contratoPdf from "../../pdfs/ContratoEsgrimaLins.pdf";

// Funções uteis
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" }); // Formato DD/MM/YYYY
}

function formatCPF(cpf) {
  if (!cpf) return "";
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

function formatRG(rg) {
  if (!rg) return "";
  return rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
}

function formatTelefone(telefone) {
  if (!telefone) return "";
  return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
}

function faltaCampo() {
  Swal.fire({
    title: 'Alerta!',
    text: 'Preencha os campo obrigatórios.',
    icon: 'warning',
    confirmButtonText: 'OK',
    confirmButtonColor: '#fbd034'
  })
}
function alertContrato() {
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
  const baseURL = window.location.origin;
  const { id_aluno } = useParams();
  // Const contratoPdf
  const [contratoPdf, setContratoPdf] = useState("");

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
  const [selectedTurmas, setSelectedTurmas] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  // State de contrato
  const [aceitouContrato, setAceitouContrato] = useState(false);

  const handleCheckboxChange = (event) => {
    setAceitouContrato(event.target.checked);
  };

  useEffect(() => {
    console.log(id_aluno);
    if (id_aluno) {
      preencherDados();
    }
  }, []);

  async function preencherDados() {
    try {
      const response = await axios.get(`/api/aluno/allData/${id_aluno}`);
      const dados = response.data[0];

      // Aluno
      setNome(dados.nome_aluno || "");
      setEmail(dados.email_aluno || "");
      setCpf(formatCPF(dados.cpf_aluno));
      setGenero(dados.genero_aluno || "");
      setRg(formatRG(dados.rg_aluno));
      setTelefone(formatTelefone(dados.telefone_aluno));
      setNascimento(formatDate(dados.data_nascimento_aluno));
      setMao_Dominante(dados.destro_canhoto || "");

      // Responsável 1
      setNomeResp1(dados.nome_responsavel1 || "");
      setEmailResp1(dados.email_responsavel1 || "");
      setCpfResp1(formatCPF(dados.cpf_responsavel1));
      setRgResp1(formatRG(dados.rg_responsavel1));
      setTelefoneResp1(formatTelefone(dados.telefone_responsavel1));
      setGeneroResp1(dados.genero_responsavel1);

      // Responsável 2
      setNomeResp2(dados.nome_responsavel2 || "");
      setEmailResp2(dados.email_responsavel2 || "");
      setCpfResp2(formatCPF(dados.cpf_responsavel2));
      setRgResp2(formatRG(dados.rg_responsavel2));
      setTelefoneResp2(formatTelefone(dados.telefone_responsavel2));
      setGeneroResp2(dados.genero_responsavel2);

      // Responsável Financeiro (Pode ser um dos responsáveis)
      setNomeFin(dados.nome_responsavel1 || "");
      setEmailFin(dados.email_responsavel1 || "");
      setCpfFin(formatCPF(dados.cpf_responsavel1));
      setRgFin(formatRG(dados.rg_responsavel1));
      setTelefoneFin(formatTelefone(dados.telefone_responsavel1));
      setGeneroFin(dados.genero_responsavel1);

      // Endereço
      setCep(dados.cep_aluno || "");
      setLogradouro(dados.rua_aluno || "");
      setBairro(dados.bairro_aluno || "");
      setCidade(dados.cidade_aluno || "");
      setUf(dados.estado_aluno || "");
      setNumero(dados.numero_aluno || "");

      let teste = dados.dia_pagamento;
      teste = teste.toString();
      setD_Vencimento(teste);
      setPlano(dados.tipo_plano);

    } catch (error) {
      console.error("Erro ao buscar unidades:", error);
    }
  }

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
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((dados) => {
        if (!dados.erro) {
          if (dados.logradouro) setLogradouro(dados.logradouro);
          if (dados.bairro) setBairro(dados.bairro);
          if (dados.localidade) setCidade(dados.localidade);
          if (dados.uf) setUf(dados.uf);
        } else {
          console.warn("CEP inválido.");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar CEP:", error);
      });
  };

  function mudarPDF() {
    if (contratoPdf === 'dec') {
      setContratoPdf(`${baseURL}/pdfs/ContratoEsgrimaLins.pdf`)
    } else {
      setContratoPdf(`${baseURL}/pdfs/EsgrimaEscola.pdf`)
    }
  }

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

    if (!id_aluno) {
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

      let responseAlunoHasTurma;
      for (let i = 0; i < selectedDay; i++) {
        responseAlunoHasTurma = await axios.post('/api/aluno_has_turma', {
          id_aluno: responsePessoa.id,
          id_turma: parseInt(selectedTurmas[i])
        });
      }

      if (responseAlunoHasTurma) {
        Swal.fire({
          title: 'Sucesso!',
          text: 'O aluno foi cadastrado com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#fbd034'
        }).then(() => {
          window.location.reload();
        })
      }
    } else {

    }
  }

  const steps = [
    <Passo1 nextStep={nextStep} nome={nome} setNome={setNome} email={email} setEmail={setEmail}
      cpf={cpf} setCpf={setCpf} genero={genero} setGenero={setGenero} rg={rg} setRg={setRg}
      telefone={telefone} setTelefone={setTelefone} nascimento={nascimento} setNascimento={setNascimento}
      mao_dominante={mao_dominante} setMao_Dominante={setMao_Dominante} calcularIdade={calcularIdade} setStep={setStep}
      areAllFieldsFilled={areAllFieldsFilled} id_aluno={id_aluno} />,

    <Passo2 nextStep={nextStep} prevStep={prevStep} nomeResp1={nomeResp1} setNomeResp1={setNomeResp1} emailResp1={emailResp1}
      setEmailResp1={setEmailResp1} cpfResp1={cpfResp1} setCpfResp1={setCpfResp1} generoResp1={generoResp1} setGeneroResp1={setGeneroResp1}
      rgResp1={rgResp1} setRgResp1={setRgResp1} telefoneResp1={telefoneResp1} setTelefoneResp1={setTelefoneResp1}
      areAllFieldsFilled={areAllFieldsFilled} id_aluno={id_aluno} />,

    <Passo3 prevStep={prevStep} nomeResp2={nomeResp2} setNomeResp2={setNomeResp2} emailResp2={emailResp2} setEmailResp2={setEmailResp2}
      cpfResp2={cpfResp2} setCpfResp2={setCpfResp2} generoResp2={generoResp2} setGeneroResp2={setGeneroResp2} rgResp2={rgResp2} setRgResp2={setRgResp2}
      telefoneResp2={telefoneResp2} setTelefoneResp2={setTelefoneResp2} setStep={setStep} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo4 nextStep={nextStep} prevStep={prevStep} son={son} setSon={setSon} setStep={setStep} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo5 nextStep={nextStep} prevStep={prevStep} nomeFin={nomeFin} setNomeFin={setNomeFin} emailFin={emailFin} setEmailFin={setEmailFin}
      cpfFin={cpfFin} setCpfFin={setCpfFin} generoFin={generoFin} setGeneroFin={setGeneroFin} rgFin={rgFin} setRgFin={setRgFin}
      telefoneFin={telefoneFin} setTelefoneFin={setTelefoneFin} areAllFieldsFilled={areAllFieldsFilled} setStep={setStep} id_aluno={id_aluno} />,

    <Passo6 nextStep={nextStep} prevStep={prevStep} cep={cep} setCep={setCep} logradouro={logradouro} setLogradouro={setLogradouro}
      bairro={bairro} setBairro={setBairro} cidade={cidade} setCidade={setCidade} uf={uf} setUf={setUf} numero={numero} setNumero={setNumero} handleBuscarCep={handleBuscarCep}
      nascimento={nascimento} calcularIdade={calcularIdade} setStep={setStep} son={son}
      pesquisarUnidades={pesquisarUnidades} id_aluno={id_aluno} />,

    <Passo7 nextStep={nextStep} prevStep={prevStep} unidades={unidades} selectedUnidade={selectedUnidade} setSelectedUnidade={setSelectedUnidade}
      areAllFieldsFilled={areAllFieldsFilled} setContratoPdf={setContratoPdf} />,

    <Passo8 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} selectedDay={selectedDay} areAllFieldsFilled={areAllFieldsFilled} />,

    <Passo9 nextStep={nextStep} prevStep={prevStep} turmas={turmas} selectedTurmas={selectedTurmas} setSelectedTurmas={setSelectedTurmas}
      areAllFieldsFilled={areAllFieldsFilled} handleChangeTurmas={handleChangeTurmas} />,

    <Passo10 nextStep={nextStep} prevStep={prevStep} plano={plano} setPlano={setPlano} d_Vencimento={d_Vencimento}
      setD_Vencimento={setD_Vencimento} areAllFieldsFilled={areAllFieldsFilled} mudarPDF={mudarPDF} id_aluno={id_aluno} setStep={setStep} />,

    <Passo11 prevStep={prevStep} cadastrar={cadastrar} areAllFieldsFilled={areAllFieldsFilled} aceitouContrato={aceitouContrato}
      handleCheckboxChange={handleCheckboxChange} contratoPdf={contratoPdf} />,
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


const Passo1 = ({ nextStep, calcularIdade, setStep, nome, setNome, email, setEmail, cpf, setCpf, genero, setGenero, rg, setRg, telefone, setTelefone, nascimento, setNascimento, mao_dominante, setMao_Dominante, areAllFieldsFilled, id_aluno }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Dados do Aluno</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Nome value={nome} setValue={setNome} texto={"Aluno"} />
      <Email value={email} setValue={setEmail} />
      <CPF value={cpf} setValue={setCpf} />
      <Genero value={genero} setValue={setGenero} />
      <RG value={rg} setValue={setRg} />
      <Telefone value={telefone} setValue={setTelefone} />
      <DtNasc value={nascimento} setValue={setNascimento} />
      <DC value={mao_dominante} setValue={setMao_Dominante} />
      <button type="button" onClick={() => {
        let camposPreenchidos = areAllFieldsFilled([nome, email, cpf, genero, rg, telefone, nascimento, mao_dominante])
        if (id_aluno) {
          let idade = calcularIdade(nascimento); // Garante que a idade seja calculada
          if (idade >= 18) {
            setStep(4); // Se maior de idade, pula para o passo 4
          } else {
            nextStep(); // Continua normalmente se menor de idade
          };
        } else if (camposPreenchidos === true) {
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

const Passo2 = ({ nextStep, prevStep, nomeResp1, setNomeResp1, emailResp1, setEmailResp1, cpfResp1, setCpfResp1, generoResp1, setGeneroResp1, rgResp1, setRgResp1, telefoneResp1, setTelefoneResp1, areAllFieldsFilled, id_aluno }) => (
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
        if (id_aluno) {
          nextStep()
        } else if (areAllFieldsFilled([nomeResp1, emailResp1, cpfResp1, generoResp1, rgResp1, telefoneResp1]) === true) {
          nextStep();
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
    <div>
      <label className={Styles.labelTextCenter}>Você será o Responsável Financeiro?</label>
      <div className={`${Styles.SimOuNao} ${Styles.radioStyle}`}>
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
        if (son === 'sim') {
          setStep(5);
        } else if (son === 'nao') {
          nextStep()
        }
      }} className={Styles.button}>
        Próximo
        <img src={require('../../imgs/icons/seta-direita.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
      </button>
    </div>
  </div>
);

const Passo5 = ({ nextStep, prevStep, nomeFin, setNomeFin, emailFin, setEmailFin, cpfFin, setCpfFin, generoFin, setGeneroFin, rgFin, setRgFin, telefoneFin, setTelefoneFin, setStep, id_aluno }) => (
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
      <button type="button" onClick={() => {
        if (id_aluno) {
          setStep(0);
        } else {
          prevStep();
        }
      }} className={Styles.button}>
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

const Passo6 = ({ nextStep, son, calcularIdade, setStep, nascimento, prevStep, handleBuscarCep, cep, setCep, logradouro, setLogradouro, bairro, setBairro, cidade, setCidade, uf, setUf, numero, setNumero, pesquisarUnidades, id_aluno }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Endereço</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Cep onBuscarCep={handleBuscarCep} value={cep} setValue={setCep} />
      <UF value={uf} setValue={setUf} />
      <Cidade value={cidade} setValue={setCidade} />
      <Bairro value={bairro} setValue={setBairro} />
      <Rua value={logradouro} setValue={setLogradouro} />
      <Numero value={numero} setValue={setNumero} />
    </div>
    <div className={Styles.divBotao}>
      <button type="button" onClick={() => {
        let idade = calcularIdade(nascimento); // Garante que a idade seja calculada
        if (id_aluno) {
          if (idade > 18) {
            prevStep();
          } else {
            setStep(2);
          }
        } else if (idade < 18) {
          setStep(2); // Se menor de idade, pula para o passo 3
        } else {
          if (son === 'sim') {
            setStep(3);
          } else if (son === 'nao') {
            prevStep();
          }
        }
      }} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button type="button" onClick={() => {
        if (id_aluno) {
          setStep(9);
        } else if (cep !== "" && uf !== "" && cidade !== "" && bairro !== "" && logradouro !== "" && numero !== "") {
          pesquisarUnidades();
          nextStep();
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

const Passo7 = ({ nextStep, prevStep, unidades, selectedUnidade, setSelectedUnidade, areAllFieldsFilled, setContratoPdf }) => (
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
          onChange={(e) => {
            const selectedId = parseInt(e.target.value);
            const selectedOption = unidades.find(unidade => unidade.id_unidade === selectedId);

            setSelectedUnidade(selectedId);
            setContratoPdf(selectedOption ? selectedOption.tipo : "");
          }}
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
        if (selectedUnidade !== "") {
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

const Passo8 = ({ nextStep, prevStep, handleChange, selectedDay, areAllFieldsFilled }) => (
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
        if (areAllFieldsFilled([selectedDay]) === true) {
          nextStep();
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

const Passo9 = ({ nextStep, prevStep, turmas, selectedTurmas, setSelectedTurmas, areAllFieldsFilled, handleChangeTurmas }) => (
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
        if (selectedTurmas !== '') {
          nextStep();
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

const Passo10 = ({ nextStep, prevStep, plano, setPlano, d_Vencimento, setD_Vencimento, mudarPDF, id_aluno, setStep }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Informações sobre<br /> Pagamento</h1>
    </div>
    <div className={Styles.container_Passo8}>
      <div className={Styles.divRadio}>
        <label className={Styles.labelTextCenter}>Qual será seu plano escolhido?</label>
        <div className={`${Styles.opcoes} ${Styles.radioStyle}`}>
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
        <div className={`${Styles.opcoes} ${Styles.radioStyle}`}>
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
      <button type="button" onClick={() => {
        if (id_aluno) {
          setStep(5);
        } else {
          prevStep();
        }
      }} className={Styles.button}>
        <img src={require('../../imgs/icons/seta-esquerda.png')} alt="icon" className={Styles.iconNavegar} draggable="false" />
        Anterior
      </button>
      <button
        type="button"
        onClick={() => {
          if (plano !== '' && d_Vencimento !== '') {
            if (id_aluno) {
              // Chama função de salvar quando existe um id_aluno
              //salvarDados();
            } else {
              // Continua para o próximo passo
              nextStep();
              mudarPDF();
            }
          } else {
            faltaCampo();
          }
        }}
        className={Styles.button}
      >
        {id_aluno ? "Salvar" : "Próximo"}
        <img
          src={require('../../imgs/icons/seta-direita.png')}
          alt="icon"
          className={Styles.iconNavegar}
          draggable="false"
        />
      </button>
    </div>
  </div>
);

const Passo11 = ({ prevStep, cadastrar, aceitouContrato, handleCheckboxChange, contratoPdf }) => (
  <div className={Styles.centro}>
    <div className={Styles.textcenter}>
      <h1>Contrato</h1>
    </div>
    <div className={Styles.divContrato}>
      <div className={Styles.contrato}>
        <a href={contratoPdf} target="_blank"
          rel="noopener noreferrer"
          className={Styles.linkContrato}
        >
          📄Visualizar Contrato(PDF)
        </a>
        <div className={Styles.contratoContainer}>
          <input type="checkbox" id="aceitarContrato" checked={aceitouContrato} onChange={handleCheckboxChange} />
          <label htmlFor="aceitarContrato">Estou ciente e concordo.</label>
        </div>
      </div>
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