import React from "react"
import Calendario from "./calendario.module.css"

export default function content_calendario(){
    return(
        <div className={Calendario.container_calendario}>
            <h1 className={Calendario.textTurma}>Turma</h1>
            <p className={Calendario.textLH}>Local: Endereço</p>
            <p className={Calendario.textLH}>Horário: 00/00</p>
        </div>
    )
}