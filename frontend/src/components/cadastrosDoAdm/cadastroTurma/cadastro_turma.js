import React from "react"
import ContainerCss from "../../containers.module.css"
import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import ContentCadastroTurma from "./content_cadastro_turma"

export default function cadastro_turma(props){
    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentCadastroTurma texto={props.texto} botao={props.botao} url={props.url}/>
        </div>
    )
}