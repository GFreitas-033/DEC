import React from "react"
import BotaoAdmAluno from "./botao.module.css"

export default function Botao_adm(){
    return(
        <div>
            <button className={BotaoAdmAluno.btn}>Criar Novo +</button>
        </div>
    )
}