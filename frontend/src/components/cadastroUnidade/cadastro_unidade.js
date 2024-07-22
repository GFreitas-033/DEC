import React from "react"
import ContainerCss from "../containers.module.css"
import BarraLateral from "../barra_lateral/icons_barra_lateral"
import ContentCadastroUnidade from "./content_cadastro_unidade"

export default function cadastro_unidade(props){
    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentCadastroUnidade texto={props.texto} botao={props.botao} url={props.url}/>
        </div>
    )
}