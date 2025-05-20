import React from "react";

import ContainerCss from "../containers.module.css";
import EstiloDashboard from "./dashboard.module.css";

import Background_Sistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

export default function Dashboard(){
    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloDashboard.nada}>

                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    )
}