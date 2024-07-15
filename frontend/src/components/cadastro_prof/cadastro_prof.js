import React from "react"
import ContainerCss from "../containers.module.css"
import BarraLateral from "../barra_lateral/icons_barra_lateral"
import ContentCadastroProfessor from "./content_cadastro_prof"

export default function cadastro_prof(){
    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentCadastroProfessor />
        </div>
    )
}