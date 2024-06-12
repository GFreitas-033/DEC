import React from "react"
import Calendario from "./calendario.module.css"

export default function content_calendario(){
    return(
        <div>
            <div>
                <h1 className={Calendario.textDia}><u>Segunda-Feira</u></h1>
                <div className={Calendario.container_calendario}>
                    <h1 className={Calendario.textTurma}>Turma</h1>
                    <p className={Calendario.textLH}>Local: Endereço</p>
                    <p className={Calendario.textLH}>Horário: 00:00</p>
                </div>
            </div>
            <div>
                <h1 className={Calendario.textDia}><u>Segunda-Feira</u></h1>
                <div className={Calendario.container_calendario}>
                    <h1 className={Calendario.textTurma}>Turma</h1>
                    <p className={Calendario.textLH}>Local: Endereço</p>
                    <p className={Calendario.textLH}>Horário: 00:00</p>
                </div>
                <div className={Calendario.container_calendario}>
                    <h1 className={Calendario.textTurma}>Turma</h1>
                    <p className={Calendario.textLH}>Local: Endereço</p>
                    <p className={Calendario.textLH}>Horário: 00:00</p>
                </div>
            </div>
            <div>
                <h1 className={Calendario.textDia}><u>Segunda-Feira</u></h1>
                <div className={Calendario.container_calendario}>
                    <h1 className={Calendario.textTurma}>Turma</h1>
                    <p className={Calendario.textLH}>Local: Endereço</p>
                    <p className={Calendario.textLH}>Horário: 00:00</p>
                </div>
            </div>
            <div>
                <h1 className={Calendario.textDia}><u>Segunda-Feira</u></h1>
                <div className={Calendario.container_calendario}>
                    <h1 className={Calendario.textTurma}>Turma</h1>
                    <p className={Calendario.textLH}>Local: Endereço</p>
                    <p className={Calendario.textLH}>Horário: 00:00</p>
                </div>
            </div>
        </div>
    )
}