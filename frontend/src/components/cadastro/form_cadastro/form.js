import React from "react"
import Styles from "./form.module.css"
// Import dos Componentes
import Texto from "../textos_cadastro/texto_cadastro"
import Email from "../inputs_cadastro/email_input"
import Senha from "../inputs_cadastro/senha_input"
import Botao from "../botao_cadastro/submit_cadastro"

export default function form(){
  return(
    <div className={Styles.container_formlogin}>
      <form className={Styles.form} autoComplete="off">
        <Texto />
        <Email />
        <Senha />
        <Botao />
      </form>
    </div>
  )
}