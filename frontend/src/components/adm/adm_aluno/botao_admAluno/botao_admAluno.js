import React from "react"
import BotaoAdmAluno from "./botao.module.css"

export default function Botao_admAluno(){
    return(
        <div>
            <button className={BotaoAdmAluno.btn}>Criar Novo +</button>
        </div>
    )
}