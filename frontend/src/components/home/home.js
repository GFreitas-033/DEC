import React from "react"
import ContainerCss from "../containers.module.css"
import BarraLateral from "../barra_lateral/icons_barra_lateral"
import ContentHome from "../home/content_home"
import Notifica from "../sino_notificacao/notificacao"

export default function home(){
    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentHome />
            <Notifica />
        </div>
    )
}