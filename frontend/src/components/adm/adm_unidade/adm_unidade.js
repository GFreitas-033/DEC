import React from "react"
import ContainerCss from "../../containers.module.css";
import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import ContentAdmUnidade from "./content_adm_unidade"

export default function adm_unidade(){
    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentAdmUnidade />
        </div>
    )
}