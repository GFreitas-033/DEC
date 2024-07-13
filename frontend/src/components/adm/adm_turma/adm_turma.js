import React from "react"
import ContainerCss from "../../containers.module.css";
import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import ContentAdmTurma from "./content_adm_turma"

export default function adm_turma(){
    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentAdmTurma />
        </div>
    )
}