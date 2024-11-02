import React from "react"
import Styles from "../antigo_cadastro/form_cadastro/form.module.css"

import Texto from "../antigo_cadastro/textos_cadastro/texto_cadastro"

// Import dos Input
import Email from "../inputs_cadastro/email_input"
import Senha from "../inputs_cadastro/senha_input"
import Nome from "../inputs_cadastro/nome_input"
import CPF from "../inputs_cadastro/cpf_input"
import RG from "../inputs_cadastro/rg_input"
import Telefone from "../inputs_cadastro/telefone_input"
import DtNasc from "../inputs_cadastro/dt_nasc_input"
import Genero from "../inputs_cadastro/genero_input"
// Import Botão
import Botao from "../cadastrosDoAdm/botao_cadastro/submit_cadastro"

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