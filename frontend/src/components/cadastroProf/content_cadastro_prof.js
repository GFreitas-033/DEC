import React,{useState} from "react"
import StyleCadastroProf from "./cadastro_prof.module.css"

import Texto from "../cadastro/textos_cadastro/texto_cadastro"

// Imports dos Inputs para Pessoa
import Imagem from "../cadastro/inputs_cadastro/imagem_input"
import Email from "../cadastro/inputs_cadastro/email_input"
import Senha from "../cadastro/inputs_cadastro/senha_input"
import Nome from "../cadastro/inputs_cadastro/nome_input"
import Cpf from "../cadastro/inputs_cadastro/cpf_input"
import Rg from "../cadastro/inputs_cadastro/rg_input"
import Telefone from "../cadastro/inputs_cadastro/telefone_input"
import DtNasc from "../cadastro/inputs_cadastro/dt_nasc_input"
import Genero from "../cadastro/inputs_cadastro/genero_input"
    //Imprts do Endereço
    import Cep from "../cadastro/inputs_cadastro/endereco/cep_input"
    import UF from "../cadastro/inputs_cadastro/endereco/uf_input"
    import Cidade from "../cadastro/inputs_cadastro/endereco/cidade_input"
    import Bairro from "../cadastro/inputs_cadastro/endereco/bairro_input"
    import Rua from "../cadastro/inputs_cadastro/endereco/rua_input"

import Botao from "../cadastro/botao_cadastro/submit_cadastro"

export default function  Content_cadastro_professor(props){
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
    return(
        <div className={StyleCadastroProf.ContentCProf}>
            <h1 className={StyleCadastroProf.titulo}><Texto text={props.texto}/></h1>

            <form className={StyleCadastroProf.content} autoComplete="off"> 
                <div className={StyleCadastroProf.contentInputs}>
                    <Imagem/>
                    <Email />
                    <Senha />
                    <Nome />
                    <Cpf />
                    <Rg />
                    <Telefone />
                    <DtNasc />
                    <Genero />

                    <Cep onBuscarCep={handleBuscarCep} />

                    <UF u={uf}/>
                    <Cidade c={cidade}/>
                    <Bairro b={bairro}/>
                    <Rua r={logradouro}/>
                </div>

                <div className={StyleCadastroProf.divBtn}>
                    <Botao btn={props.botao} className={StyleCadastroProf.btn}/>
                </div>
            </form>
        </div>
    )
}