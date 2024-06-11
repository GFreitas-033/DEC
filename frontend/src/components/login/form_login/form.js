import React from "react"
import Styles from "./form.module.css"
// Import dos Componentes
import Texto from "../textos/texto_logar"
import Email from "../inputs/email_input"
import Senha from "../inputs/senha_input"
import Botao from "../botao_logar/submit_logar"

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