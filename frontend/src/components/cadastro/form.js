import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Styles from "./form.module.css";
import axios from "axios";

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

export default function Form() {

  const [step, setStep] = useState(0);
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [telefone, setTelefone] = useState("");
  const [id_endereco, setEndereco] = useState(null);
  const [responsePessoa, setResponsePessoa] = useState(null);

  const [idade, setIdade] = useState(null);

  let { id_aluno } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id_aluno !== undefined) {
      logado();
      id_aluno = parseInt(id_aluno);
      preencherDados();
    }
  }, [id_aluno]);

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idadeCalculada = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth();
    if (mes < nascimento.getMonth() || (mes === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())) {
      idadeCalculada--;
    }
    setIdade(idadeCalculada); // Atualiza a idade
  };

  const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatRG = (rg) => {
    return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
  };

  const formatTelefone = (telefone) => {
    telefone = telefone.replace(/\D/g, ''); // Remove non-digits
    if (telefone.length === 11) {
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telefone.length === 10) {
      return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
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

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const steps = [
    <Passo1 nextStep={nextStep} rg={rg} setRg={setRg} cpf={cpf} setCpf={setCpf} />,
    <Passo2 nextStep={nextStep} prevStep={prevStep} telefone={telefone} setTelefone={setTelefone} setIdade={setIdade} />,
    <Passo3 nextStep={nextStep} prevStep={prevStep} handleBuscarCep={handleBuscarCep} uf={uf} cidade={cidade} bairro={bairro} logradouro={logradouro} />,
  ];

  const logado = async () => {
    try {
      let response = await axios.post('/login');
      if (response.data.adm !== 1) {
        navigate('/home');
      }
    } catch (error) {
      navigate('/');
    }
  };

  function tratamentoString(inputString) {
    return inputString.replace(/[.\-()\s]/g, '');
  }

  function formatarData(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  // Obter a data atual
  const dataAtual = new Date();
  const adicionarZero = (numero) => (numero < 10 ? `0${numero}` : numero);
  const ano = dataAtual.getFullYear();
  const mes = adicionarZero(dataAtual.getMonth() + 1);
  const dia = adicionarZero(dataAtual.getDate());
  const dataFormatadaMySQL = `${ano}-${mes}-${dia}`;

  const preencherDados = async () => {
    try {
      let responsePessoa = await axios.get('/api/pessoa');
      responsePessoa = responsePessoa.data;
      responsePessoa = responsePessoa.find(item => item.id_pessoa === id_aluno);
      setEndereco(responsePessoa.id_endereco);
      document.getElementById('email').value = responsePessoa.email_pessoa;
      document.getElementById('nome').value = responsePessoa.nome_pessoa;
      setCpf(formatCPF(responsePessoa.cpf_pessoa));
      setRg(formatRG(responsePessoa.rg_pessoa));
      setTelefone(formatTelefone(responsePessoa.telefone_pessoa));
      let responseAluno = await axios.get('/api/aluno');
      responseAluno = responseAluno.data;
      responseAluno = responseAluno.find(item => item.id_pessoa === id_aluno);
      document.getElementById('maodominante').value = responseAluno.destro_canhoto;
      document.getElementById('dt_nasc').value = formatarData(responsePessoa.dt_nasc_pessoa);
      document.getElementById('genero').value = responsePessoa.genero;
      let responseEndereco = await axios.get('/api/endereco');
      responseEndereco = responseEndereco.data;
      responseEndereco = responseEndereco.find(item => item.id_endereco === responsePessoa.id_endereco);
      document.getElementById('cep').value = responseEndereco.cep;
      document.getElementById('uf').value = responseEndereco.estado;
      document.getElementById('cidade').value = responseEndereco.cidade;
      document.getElementById('bairro').value = responseEndereco.bairro;
      document.getElementById('rua').value = responseEndereco.rua;
    } catch (error) {
      console.log(error);
    }
  };

  async function cliquei() {
    const email = document.getElementById('email').value;
    const nome = document.getElementById('nome').value;
    const cpf = tratamentoString(document.getElementById('cpf').value);
    const rg = tratamentoString(document.getElementById('rg').value);
    const telefone = tratamentoString(document.getElementById('telefone').value);
    const dt_nascimento = document.getElementById('dt_nasc').value;
    const maodominante = document.getElementById('maodominante').value;
    const genero = document.getElementById('genero').value;
    const cep = document.getElementById('cep').value;
    const uf = document.getElementById('uf').value;
    const cidade = document.getElementById('cidade').value;
    const bairro = document.getElementById('bairro').value;
    const rua = document.getElementById('rua').value;
    if (id_aluno !== undefined) {
      try {
        let responseEndereco = await axios.put(`/api/endereco/${id_endereco}`, {
          cep: cep,
          estado: uf,
          cidade: cidade,
          bairro: bairro,
          rua: rua,
          numero: null
        });

        let responsePessoa = await axios.put(`/api/pessoa/${id_aluno}`, {
          nome_pessoa: nome,
          dt_nasc_pessoa: dt_nascimento,
          cpf_pessoa: cpf,
          rg_pessoa: rg,
          email_pessoa: email,
          telefone_pessoa: telefone,
          genero: genero,
          id_endereco: id_endereco
        });

        const responseAluno = await axios.put(`/api/aluno/${id_aluno}`, {
          id_pessoa: id_aluno,
          destro_canhoto: maodominante,
          id_responsavel: null,
        });

        setResponsePessoa(responseAluno);
      } catch (error) {
        console.log("Erro ao criar aluno: ", error);
      }
    }else{
      const senha = document.getElementById('senha').value;
      try {
        let responseEndereco = await axios.post('/api/endereco/', {
          cep: cep,
          estado: uf,
          cidade: cidade,
          bairro: bairro,
          rua: rua,
          numero: null
        });
        responseEndereco = responseEndereco.data;

        let responsePessoa = await axios.post('/api/pessoa/', {
          nome_pessoa: nome,
          dt_nasc_pessoa: dt_nascimento,
          cpf_pessoa: cpf,
          rg_pessoa: rg,
          email_pessoa: email,
          senha_pessoa: senha,
          telefone_pessoa: telefone,
          genero: genero,
          id_endereco: responseEndereco.id,
          adm: null
        });
        responsePessoa = responsePessoa.data;

        const responseAluno = await axios.post('/api/aluno', {
          id_pessoa: responsePessoa.id,
          destro_canhoto: maodominante,
          id_responsavel: null,
          dt_inicio: dataFormatadaMySQL
        });

        setResponsePessoa(responseAluno);
      } catch (error) {
        console.log("Erro ao criar aluno: ", error);
      }
    }
    
  }

  if (responsePessoa) {
    alert("Sucesso!!!");
    window.location.reload();
  }

  return (
    <div className={Styles.container_formcadastro}>
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
  );
}

const Passo1 = ({ nextStep, rg, setRg, cpf, setCpf }) => (
  <div>
    <div className={Styles.textcenter}>
      <h1>Dados do Aluno</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Email />
      <Senha />
      <Nome />
      <RG value={rg} setValue={setRg} />
      <CPF value={cpf} setValue={setCpf} />
      <br />
      <button type="button" onClick={nextStep} className={Styles.button}>Avançar</button>
    </div>
  </div>
);

const Passo2 = ({ nextStep, prevStep, telefone, setTelefone, calcularIdade }) => (
  <div>
    <div className={Styles.textcenter}>
      <h1>Dados do Aluno</h1>
    </div>
    <div className={Styles.container_inputs}>
      <Telefone value={telefone} setValue={setTelefone} />
      <DtNasc onChange={(e) => calcularIdade(e.target.value)} />
      <Genero />
      <DC />
      <button type="button" onClick={prevStep} className={Styles.button}>Voltar</button>
      <button type="button" onClick={nextStep} className={Styles.button}>Avançar</button>
    </div>
  </div>
);

const Passo3 = ({ nextStep, prevStep, handleBuscarCep, uf, cidade, bairro, logradouro, isUnder18, cliquei }) => (
  <div>
      <div className={Styles.textcenter}>
          <h1>Endereço</h1>
      </div>
      <div className={Styles.container_inputs}>
          <Cep onBuscarCep={handleBuscarCep} />
          <UF u={uf} />
          <Cidade c={cidade} />
          <Bairro b={bairro} />
          <Rua r={logradouro} />
          <br />
          <button type="button" onClick={prevStep} className={Styles.button}>Voltar</button>
          <button type="button" onClick={isUnder18 ? nextStep : cliquei} className={Styles.button}>
              {isUnder18 ? "Avançar" : "Cadastrar"}
          </button>
      </div>
  </div>
);