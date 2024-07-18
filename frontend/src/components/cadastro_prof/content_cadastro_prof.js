import React from "react"
import StyleCadastroProf from "./cadastro_prof.module.css"

// Imports dos Inputs para Pessoa
import Imagem from "../cadastro/inputs_cadastro/imagem_input"
import Email from "../cadastro/inputs_cadastro/email_input"
import Senha from "../cadastro/inputs_cadastro/senha_input"
import Nome from "../cadastro/inputs_cadastro/nome_input"
import Cpf from "../cadastro/inputs_cadastro/cpf_input"
import Rg from "../cadastro/inputs_cadastro/rg_input"
import Telefone from "../cadastro/inputs_cadastro/telefone_input"
import Dt_Nasc from "../cadastro/inputs_cadastro/dt_nasc_input"
import Genero from "../cadastro/inputs_cadastro/genero_input"

export default function  Content_cadastro_professor(){
    return(
        <div className={StyleCadastroProf.ContentCProf}>
            <h1 className={StyleCadastroProf.titulo}>Cadastro de Professores</h1>

            <div className={StyleCadastroProf.contentInputs}>
                <Imagem/>
                <Email />
                <Senha />
                <Nome />
                <Cpf />
                <Rg />
                <Telefone />
                <Dt_Nasc />
                <Genero />
            </div>
        </div>
    )
}