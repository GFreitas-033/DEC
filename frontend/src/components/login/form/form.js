import React from "react"
import Styles from "./form.module.css"
import Botao from "../botao_logar/submit_logar"
import Texto from "../textos/texto_logar"
import Email from "../inputs/email_input"
import Senha from "../inputs/senha_input"
import SeCadastre from "../textos/texto_secadastre"

export default function App(){
  return(
    <div className={Styles.container}>
      <div className={Styles.backgroundImage}></div> 
      <form action="" className={Styles.form}>
        <Texto />
        <Email />
        <Senha />
        <Botao />
        <SeCadastre />
      </form>
    </div>
  )
}