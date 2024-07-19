import React from "react"
import Styles from "../cadastro/form_cadastro/form.module.css"

import Texto from "../cadastro/textos_cadastro/texto_cadastro"

// Import dos Input
import Email from "../cadastro/inputs_cadastro/email_input"
import Senha from "../cadastro/inputs_cadastro/senha_input"
import Nome from "../cadastro/inputs_cadastro/nome_input"
import CPF from "../cadastro/inputs_cadastro/cpf_input"
import RG from "../cadastro/inputs_cadastro/rg_input"
import Telefone from "../cadastro/inputs_cadastro/telefone_input"
import DtNasc from "../cadastro/inputs_cadastro/dt_nasc_input"
import Genero from "../cadastro/inputs_cadastro/genero_input"
// Import Botão
import Botao from "../cadastro/botao_cadastro/submit_cadastro"

export default function FormCadastroResponsavel(props){

  return(
    <div className={Styles.container_formcadastro}>
      <form className={Styles.form} autoComplete="off">
        <Texto text={props.texto} />
        <div className={Styles.container_inputs}>
          <Email />
          <Senha />
          <Nome />
          <CPF />
          <RG />
          <Telefone />
          <DtNasc />
          <Genero />
        </div>
        <Botao btn={props.botao}/>
      </form>
    </div>
  )
}