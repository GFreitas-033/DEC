import React from "react"
import ContainerCss from "../../containers.module.css"
import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import ContentCadastroResponsavelUnidade from "./content_cadastro_res_uni"

export default function cadastro_responsavel_unidade(props){
    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentCadastroResponsavelUnidade texto={props.texto} botao={props.botao}/>
        </div>
    )
}