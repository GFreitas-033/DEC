import React from "react"
import ContainerCss from "../containers.module.css"
import BarraLateral from "../barra_lateral/icons_barra_lateral"
import ContentAdm from "./content_adm"

export default function adm(){
    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentAdm />
        </div>
    )
}