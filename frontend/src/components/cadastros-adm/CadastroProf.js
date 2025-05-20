import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import ContainerCss from "../containers.module.css";
import StyleCadastroProf from "./cadastroDoAdm.module.css";

import Background_Sistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

// Imports dos Inputs para Pessoa
// import Imagem from "../../inputs_cadastro/Imagem";
import Email from "../inputs-cadastro/Email";
import Senha from "../inputs-cadastro/Senha";
import Nome from "../inputs-cadastro/Nome";
import Cpf from "../inputs-cadastro/Cpf";
import Rg from "../inputs-cadastro/Rg";
import Telefone from "../inputs-cadastro/Telefone";
import DtNasc from "../inputs-cadastro/DtNasc";
import Genero from "../inputs-cadastro/Genero";

// Imports do Endereço
import Cep from "../inputs-cadastro/endereco/Cep";
import UF from "../inputs-cadastro/endereco/Uf";
import Cidade from "../inputs-cadastro/endereco/Cidade";
import Bairro from "../inputs-cadastro/endereco/Bairro";
import Rua from "../inputs-cadastro/endereco/Rua";

export default function Cadastro_prof({ texto, btn }){
    const navigate = useNavigate();
    let { id_professor } = useParams();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [dtNasc, setDtnasc] = useState("");
    const [genero, setGenero] = useState("");
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [id_endereco, setEndereco] = useState(null);
    
    const [responsePessoa, setResponsePessoa] = useState(null);

    const alertErroCadastro = () => {
        Swal.fire({
        title: "Não foi possível Cadastrar o Professor(a).",
        icon: "error",
        confirmButtonColor: "#fbd034",
        background: "#2b2b2b",
        theme: "dark"
        })
    };
    const alertSucessoCadastro = () => {
        Swal.fire({
            title: "Professor(a) Cadastrado(a) com Sucesso.",
            icon: "success",
            confirmButtonColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        })
    };

    useEffect(() => {
        logado();
    });

    const logado = async () => {
        try {
            let response = await axios.post('/login');
            response = response.data;
            if(response.adm!==1){
                navigate('/home');
            }
        } catch (error) {
            navigate('/');
        }
    };

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
        }else if (telefone.length === 10) {
            return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return telefone;
    };
  
    function padraoBR(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Meses começam em 0
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }
  
    const preencherDados = async () => {
        try {
            let responsePessoa = await axios.get('/api/pessoa');
            responsePessoa = responsePessoa.data;
            responsePessoa = responsePessoa.find(item => item.id_pessoa === id_professor);
            setEndereco(responsePessoa.id_endereco);
            setEmail(responsePessoa.email_pessoa);
            setNome(responsePessoa.nome_pessoa);
            setCpf(formatCPF(responsePessoa.cpf_pessoa));
            setRg(formatRG(responsePessoa.rg_pessoa));
            setTelefone(formatTelefone(responsePessoa.telefone_pessoa));
            setDtnasc(padraoBR(responsePessoa.dt_nasc_pessoa));
            setGenero(responsePessoa.genero);
            let responseEndereco = await axios.get('/api/endereco');
            responseEndereco = responseEndereco.data;
            responseEndereco = responseEndereco.find(item => item.id_endereco === responsePessoa.id_endereco);
            setCep(responseEndereco.cep);
            setUf(responseEndereco.estado);
            setCidade(responseEndereco.cidade);
            setBairro(responseEndereco.bairro);
            setLogradouro(responseEndereco.rua);
        }catch (error) {
            console.log(error);
        }
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
  
    function tratamentoString(inputString) {
        return inputString.replace(/[.\-()\s]/g, '');
    }
  
    const convertDate = (date) => {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    };
  
    const cliquei = async (event) =>{
        event.preventDefault();
        // const caminho_foto = document.getElementById('imagem').value;
        if (id_professor !== undefined) {
            try {
                console.log(id_endereco);
                let responseEndereco = await axios.put(`/api/endereco/${id_endereco}`, {
                    cep: cep,
                    estado: uf,
                    cidade: cidade,
                    bairro: bairro,
                    rua: logradouro,
                    numero: null
                });
                console.log(id_endereco);
                let responsePessoa = await axios.put(`/api/pessoa/${id_professor}`, {
                    nome_pessoa: nome,
                    dt_nasc_pessoa: convertDate(dtNasc),
                    cpf_pessoa: tratamentoString(cpf),
                    rg_pessoa: tratamentoString(rg),
                    email_pessoa: email,
                    telefone_pessoa: tratamentoString(telefone),
                    genero: genero,
                    id_endereco: id_endereco
                });
            const responseProfessor = await axios.put(`/api/professor/${id_professor}`, {
                id_pessoa: responsePessoa.id,
                caminho_foto: null
            });
            setResponsePessoa(responseProfessor);
        }catch (error) {
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
                    rua: logradouro,
                    numero: null
                });
                responseEndereco = responseEndereco.data;
                let responsePessoa = await axios.post('/api/pessoa/', {
                    nome_pessoa: nome,
                    dt_nasc_pessoa: convertDate(dtNasc),
                    cpf_pessoa: tratamentoString(cpf),
                    rg_pessoa: tratamentoString(rg),
                    email_pessoa: email,
                    senha_pessoa: senha,
                    telefone_pessoa: tratamentoString(telefone),
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
            }catch (error) {
                console.log("Erro ao criar professor: ", error);
                alertErroCadastro();
            }
        }
    }
  
    // Recarrega a página quando responsePessoa estiver disponível
    if (responsePessoa) {
      alertSucessoCadastro();
      preencherDados();
    }

    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={StyleCadastroProf.content}>
                    <div className={StyleCadastroProf.textcenter}>
                        <h1>{texto}</h1>
                    </div>
                    <form className={StyleCadastroProf.form} autoComplete="off" onSubmit={cliquei}>
                        <div className={StyleCadastroProf.contentInputs}>
                            {/* <Imagem/> */}
                            <Email value={email} setValue={setEmail}/>
                            {id_professor === undefined && <Senha value={senha} setValue={setSenha}/>}
                            <Nome value={nome} setValue={setNome}/>
                            <Cpf value={cpf} setValue={setCpf} />
                            <Rg value={rg} setValue={setRg} />
                            <Telefone value={telefone} setValue={setTelefone} />
                            <DtNasc value={dtNasc} setValue={setDtnasc}/>
                            <Genero value={genero} setValue={setGenero}/>
                            <Cep onBuscarCep={handleBuscarCep} value={cep} setValue={setCep}/>
                            <UF value={uf} setValue={setUf}/>
                            <Cidade value={cidade} setValue={setCidade}/>
                            <Bairro value={bairro} setValue={setBairro}/>
                            <Rua value={logradouro} setValue={setLogradouro}/>
                        </div>
                        <div className={StyleCadastroProf.divBtn}>
                            <button className={StyleCadastroProf.btn}>
                                <h1>{btn}</h1>
                            </button>
                        </div>
                    </form>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    )
}