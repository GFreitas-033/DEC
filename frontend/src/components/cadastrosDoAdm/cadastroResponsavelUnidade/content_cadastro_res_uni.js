import React,{useState, useEffect} from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import StyleResUni from "../cadastroDoAdm.module.css"
import axios from "axios"

import Texto from "../../cadastro/textos_cadastro/texto_cadastro"

// Imports dos Inputs para Pessoa
import Email from "../../cadastro/inputs_cadastro/email_input"
import Senha from "../../cadastro/inputs_cadastro/senha_input"
import Nome from "../../cadastro/inputs_cadastro/nome_input"
import Cpf from "../../cadastro/inputs_cadastro/cpf_input"
import Rg from "../../cadastro/inputs_cadastro/rg_input"
import Telefone from "../../cadastro/inputs_cadastro/telefone_input"
import DtNasc from "../../cadastro/inputs_cadastro/dt_nasc_input"
import Genero from "../../cadastro/inputs_cadastro/genero_input"
    //Imprts do Endereço
    import Cep from "../../cadastro/inputs_cadastro/endereco/cep_input"
    import UF from "../../cadastro/inputs_cadastro/endereco/uf_input"
    import Cidade from "../../cadastro/inputs_cadastro/endereco/cidade_input"
    import Bairro from "../../cadastro/inputs_cadastro/endereco/bairro_input"
    import Rua from "../../cadastro/inputs_cadastro/endereco/rua_input"

import Botao from "../../cadastro/botao_cadastro/submit_cadastro"

export default function  Content_cadastro_Unidade(props){
    const navigate = useNavigate()
    const {state} = useLocation();
    let { id_res_unidade } = useParams();
    const [responsePessoa, setResponsePessoa] = useState(null);
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const nome_unidade = state?.nome;
    const cnpj_unidade = state?.cnpj;
    const telefone_unidade = state?.telefone;
    const email_unidade = state?.email;
    const maisContatos = state?.maisContatos;
    const cep_unidade = state?.cep;
    const uf_unidade = state?.uf;
    const cidade_unidade = state?.cidade;
    const bairro_unidade = state?.bairro;
    const rua_unidade = state?.rua;
    const numero_unidade = state?.numero;

    useEffect(() => {
      if (id_res_unidade !== undefined) {
        id_res_unidade = parseInt(id_res_unidade);
        // preencherDados();
      }
    }, [id_res_unidade]);

    const [logradouro, setLogradouro] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUf] = useState("")
    
    const handleBuscarCep = (cep) => {
      if(cep.length < 9){
        setLogradouro("")
        setBairro("")
        setCidade("")
        setUf("")
      }
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((dados) => {
          setLogradouro(dados.logradouro)
          setBairro(dados.bairro)
          setCidade(dados.localidade)
          setUf(dados.uf)
        })
        .catch((error) => {
          console.error('Erro ao buscar CEP:', error)
        })
    }

    function tratamentoString(inputString) {
      return inputString.replace(/[.\-()\s]/g, '');
    }

    async function cliquei() {
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
      
      if (id_res_unidade !== undefined) {
        
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

          const responseRes_Unidade = await axios.post('/api/responsavel_unidade/', {
            id_pessoa: responsePessoa.id,
          });

          let responseEndereco_Unidade = await axios.post('/api/endereco/', {
            cep: cep_unidade,
            estado: uf_unidade,
            cidade: cidade_unidade,
            bairro: bairro_unidade,
            rua: rua_unidade,
            numero: numero_unidade
          });
          responseEndereco_Unidade = responseEndereco_Unidade.data;

          const responseUnidade = await axios.post('/api/unidade', {
            nome_unidade: nome_unidade, 
            cnpj_unidade: cnpj_unidade, 
            telefone_unidade: telefone_unidade, 
            email_unidade: email_unidade, 
            mais_contatos: maisContatos, 
            id_endereco: responseEndereco_Unidade.id, 
            id_responsavel_unidade: responsePessoa.id
          })

          setResponsePessoa(responseUnidade);
        } catch (error) {
          console.log("Erro ao criar professor: ", error);
        }
      }
      
    }


    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      if (form.checkValidity()) {
        cliquei();
      } else {
        form.reportValidity();
      }
    };


    if (responsePessoa) {
      alert('Sucesso!!!');
      navigate('/cadastro/unidade');
    }

    return(
        <div className={StyleResUni.ContentC}>
            <h1 className={StyleResUni.titulo}><Texto text={props.texto}/></h1>

            <form className={StyleResUni.content} autoComplete="off" onSubmit={handleSubmit}> 
                <div className={StyleResUni.contentInputs}>
                    <Email />
                    <Senha />
                    <Nome />
                    <Cpf value={cpf} setValue={setCpf} />
                    <Rg value={rg} setValue={setRg} />
                    <Telefone value={telefone} setValue={setTelefone} />
                    <DtNasc />
                    <Genero />

                    <Cep onBuscarCep={handleBuscarCep} />

                    <UF u={uf}/>
                    <Cidade c={cidade}/>
                    <Bairro b={bairro}/>
                    <Rua r={logradouro}/>
                </div>

                <div className={StyleResUni.divBtn}>
                    <Botao btn={props.botao} onClick={cliquei} className={StyleResUni.btn}/>
                </div>
            </form>
        </div>
    )
}