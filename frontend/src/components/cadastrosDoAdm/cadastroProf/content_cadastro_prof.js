  import React, { useState, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import StyleCadastroProf from "../cadastroDoAdm.module.css";
  import Texto from "../../antigo_cadastro/textos_cadastro/texto_cadastro";
  import axios from "axios";

  // Imports dos Inputs para Pessoa
  import Imagem from "../../inputs_cadastro/imagem_input";
  import Email from "../../inputs_cadastro/email_input";
  import Senha from "../../inputs_cadastro/senha_input";
  import Nome from "../../inputs_cadastro/nome_input";
  import Cpf from "../../inputs_cadastro/cpf_input";
  import Rg from "../../inputs_cadastro/rg_input";
  import Telefone from "../../inputs_cadastro/telefone_input";
  import DtNasc from "../../inputs_cadastro/dt_nasc_input";
  import Genero from "../../inputs_cadastro/genero_input";

  // Imports do Endereço
  import Cep from "../../inputs_cadastro/endereco/cep_input";
  import UF from "../../inputs_cadastro/endereco/uf_input";
  import Cidade from "../../inputs_cadastro/endereco/cidade_input";
  import Bairro from "../../inputs_cadastro/endereco/bairro_input";
  import Rua from "../../inputs_cadastro/endereco/rua_input";

  import Botao from "../botao_cadastro/submit_cadastro";

  export default function Content_cadastro_Professor(props) {
    let { id_professor } = useParams();
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [id_endereco, setEndereco] = useState(null);
    
    const [responsePessoa, setResponsePessoa] = useState(null);

    useEffect(() => {
      if (id_professor !== undefined) {
        id_professor = parseInt(id_professor);
        preencherDados();
      }
    }, [id_professor]);

    function formatarData(dateString) {
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    }

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

    const preencherDados = async () => {
      try {
        let responsePessoa = await axios.get('/api/pessoa');
        responsePessoa = responsePessoa.data;
        responsePessoa = responsePessoa.find(item => item.id_pessoa === id_professor);
        setEndereco(responsePessoa.id_endereco);
        document.getElementById('email').value = responsePessoa.email_pessoa;
        document.getElementById('nome').value = responsePessoa.nome_pessoa;
        document.getElementById('cpf').value = formatCPF(responsePessoa.cpf_pessoa);
        document.getElementById('rg').value = formatRG(responsePessoa.rg_pessoa);
        document.getElementById('telefone').value = formatTelefone(responsePessoa.telefone_pessoa);
        setCpf(formatCPF(responsePessoa.cpf_pessoa));
        setRg(formatRG(responsePessoa.rg_pessoa));
        setTelefone(formatTelefone(responsePessoa.telefone_pessoa));
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
          document.getElementById('cpf').value = cpf;
          document.getElementById('rg').value = rg;
          document.getElementById('telefone').value = telefone;
        })
        .catch((error) => {
          console.error('Erro ao buscar CEP:', error);
        });
    };

    function tratamentoString(inputString) {
      return inputString.replace(/[.\-()\s]/g, '');
    }


    const cliquei = async (event) =>{
      event.preventDefault();
      const email = document.getElementById('email').value;
      const nome = document.getElementById('nome').value;
      const cpf = tratamentoString(document.getElementById('cpf').value);
      const rg = tratamentoString(document.getElementById('rg').value);
      const telefone = tratamentoString(document.getElementById('telefone').value);
      const dt_nascimento = document.getElementById('dt_nasc').value;
      const genero = document.getElementById('genero').value;
      const cep = document.getElementById('cep').value;
      const uf = document.getElementById('uf').value;
      const cidade = document.getElementById('cidade').value;
      const bairro = document.getElementById('bairro').value;
      const rua = document.getElementById('rua').value;
      const caminho_foto = document.getElementById('imagem').value;
      
      if (id_professor !== undefined) {
        try {
          console.log(id_endereco);
          let responseEndereco = await axios.put(`/api/endereco/${id_endereco}`, {
            cep: cep,
            estado: uf,
            cidade: cidade,
            bairro: bairro,
            rua: rua,
            numero: null
          });
          console.log(id_endereco);
          let responsePessoa = await axios.put(`/api/pessoa/${id_professor}`, {
            nome_pessoa: nome,
            dt_nasc_pessoa: dt_nascimento,
            cpf_pessoa: cpf,
            rg_pessoa: rg,
            email_pessoa: email,
            telefone_pessoa: telefone,
            genero: genero,
            id_endereco: id_endereco
          });

          const responseProfessor = await axios.put(`/api/professor/${id_professor}`, {
            id_pessoa: responsePessoa.id,
            caminho_foto: null
          });

          setResponsePessoa(responseProfessor);
        } catch (error) {
          console.log("Erro ao editar professor: ", error);
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

          const responseProfessor = await axios.post('/api/professor/', {
            id_pessoa: responsePessoa.id,
            caminho_foto: null
          });

          setResponsePessoa(responseProfessor.data);
        } catch (error) {
          console.log("Erro ao criar professor: ", error);
        }
      }
      
    }

    // Recarrega a página quando responsePessoa estiver disponível
    if (responsePessoa) {
      alert("Sucesso!!!");
      window.location.reload();
    }

    return (
      <div className={StyleCadastroProf.ContentC}>
        <h1 className={StyleCadastroProf.titulo}>
          <Texto text={props.texto} />
        </h1>

        <form className={StyleCadastroProf.content} autoComplete="off" onSubmit={cliquei}>
          <div className={StyleCadastroProf.contentInputs}>
            <Imagem/>
            <Email/>
            {id_professor === undefined && <Senha />}
            <Nome/>
            <Cpf value={cpf} setValue={setCpf} />
            <Rg value={rg} setValue={setRg} />
            <Telefone value={telefone} setValue={setTelefone} />
            <DtNasc/>
            <Genero/>

            <Cep onBuscarCep={handleBuscarCep}/>

            <UF u={uf}/>
            <Cidade c={cidade}/>
            <Bairro b={bairro}/>
            <Rua r={logradouro}/>
          </div>

          <div className={StyleCadastroProf.divBtn}>
            <Botao btn={props.botao} className={StyleCadastroProf.btn} />
          </div>
        </form>
      </div>
    );
  }
