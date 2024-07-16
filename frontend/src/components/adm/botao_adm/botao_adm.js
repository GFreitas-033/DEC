import React from "react"
import { useNavigate } from "react-router-dom"
import BotaoAdmAluno from "./botao.module.css"

export default function Botao_adm(props){
    const navigate = useNavigate()

    return(
        <div>
            <button className={BotaoAdmAluno.btn}
                onClick={()=>navigate(props.url)}>
                {props.texto}
            </button>
        </div>
    )
}