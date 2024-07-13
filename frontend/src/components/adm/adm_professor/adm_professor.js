import React from "react"
import ContainerCss from "../../containers.module.css";
import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import ContentAdmProfessor from "./content_adm_professor"

export default function adm_prof(){
    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentAdmProfessor />
        </div>
    )
}