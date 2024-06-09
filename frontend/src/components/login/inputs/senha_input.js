import React from "react"
import Senha from "./input.module.css"

export default function email_input(){
    return(
        <div className={Senha.esquerda}>
            <label className={Senha.label}><b>Senha</b></label><br />
            <input type="password" id="senha" placeholder="Coloque sua senha aqui" required className={Senha.input}/><br />
        </div>
    )
}