import React from "react"
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

import Botao from "../cadastro/botao_cadastro/submit_cadastro"

export default function  Content_cadastro_professor(props){
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
                </div>

                <div className={StyleCadastroProf.divBtn}>
                    <Botao btn={props.botao} className={StyleCadastroProf.btn}/>
                </div>
            </form>
        </div>
    )
}