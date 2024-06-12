import React from "react"
import Barra_lateral from "../../barra_lateral/icons_barra_lateral"
import Calendario from "./alunoCalendario.module.css"
import ContainerCss from "../../containers.module.css"

export default function alunos_calendario(){
    return(
        <div className={ContainerCss.container}>
            <Barra_lateral />
            <div className={Calendario.ajuste}>
                <div className={Calendario.container_alunoscalendario}>
                    <h1 className={Calendario.textTurma}>Turma</h1>
                    <p className={Calendario.textLH}>Local: Endereço</p>
                    <p className={Calendario.textLH}>Horário: 00:00</p>
                    <ul className={Calendario.lista}>
                        <li>Professor</li>
                        <li>Aluno</li>
                        <li>Aluno</li>
                        <li>Aluno</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}