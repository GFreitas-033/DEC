import React from "react"
import ContainerCss from "../containers.module.css"
import BarraLateral from "../barra_lateral/icons_barra_lateral"
import ContentCalendario from "../calendario/content_calendario"

export default function calendario(){
    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentCalendario />
        </div>
    )
}