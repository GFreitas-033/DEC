import React from "react"
import ContainerCss from "../../containers.module.css";
import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import ContentAdmAluno from "./content_adm_aluno"

export default function adm_aluno(){
    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentAdmAluno />
        </div>
    )
}