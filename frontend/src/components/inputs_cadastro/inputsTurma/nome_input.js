import React from "react"
import Nome from "../input.module.css"

export default function nome_input(){
    return(
        <div className={Nome.esquerda}>
            <label className={Nome.label}><b>Nome da Turma</b></label><br />
            <input type="text" id="nome" placeholder="Insira um nome da turma" required className={Nome.input} autoComplete="off"/><br />
        </div>
    )
}