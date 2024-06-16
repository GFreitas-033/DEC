import React from "react"
import Styles from "./form.module.css"
// Import dos Input
import Texto from "../textos_cadastro/texto_cadastro"
import Email from "../inputs_cadastro/email_input"
import Senha from "../inputs_cadastro/senha_input"
import Nome from "../inputs_cadastro/nome_input"
import CPF from "../inputs_cadastro/cpf_input"
import RG from "../inputs_cadastro/rg_input"
import Telefone from "../inputs_cadastro/telefone_input"
import Dt_nasc from "../inputs_cadastro/dt_nasc_input"
// Import Botão
import Botao from "../botao_cadastro/submit_cadastro"

export default function form(){
  return(
    <div className={Styles.container_formcadastro}>
      <form className={Styles.form} autoComplete="off">
        <Texto />
        <div className={Styles.container_inputs}>
          <Email />
          <Senha />
          <Nome />
          <CPF />
          <RG />
          <Telefone />
          <Dt_nasc />
        </div>
        <Botao />
      </form>
    </div>
  )
}