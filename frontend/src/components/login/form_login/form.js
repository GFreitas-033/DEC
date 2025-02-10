import React from "react"
import Styles from "./form.module.css"
// Import dos Componentes
import Texto from "../textos_logar/texto_logar"
import Email from "../inputs_logar/email_input"
import Senha from "../inputs_logar/senha_input"
import Botao from "../botao_logar/submit_logar"

export default function form(){
  return(
    <div>
        <div className={Styles.backgroundContainer}>
            <img src={require('../../../imgs/backgroundDesktop/backNormal.png')} 
              alt="Background" className={Styles.responsiveImg} id={Styles.backDesk} draggable="false"/>
            <img src={require('../../../imgs/backgroundMobile/backNormalMob.png')} 
              alt="Background" className={Styles.responsiveImg} id={Styles.backMob} draggable="false"/>
        </div>
        
        <div className={Styles.container_formlogin}>
          <div className={Styles.borda}>
            <form className={Styles.form} autoComplete="off">
              <Texto />
              <Email />
              <Senha />
              <Botao />
            </form>
          </div>
        </div>
    </div>

  )
}