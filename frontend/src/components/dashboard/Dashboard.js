import React from "react";

import ContainerCss from "../containers.module.css";
import EstiloDashboard from "./dashboard.module.css";

import Background_Sistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

// Import dos Blocos do Dashboard
import Geral from "./geral/AnaliseGeral"

export default function Dashboard(){
    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloDashboard.ajusteTela}>
                    <div className={EstiloDashboard.containerDash}>
                        {/* <hr /> */}
                        <Geral />
                        <div className={EstiloDashboard.containerGraficos}>

                        </div>
                        <div className={EstiloDashboard.containerAnoNasc}>

                        </div>
                        <hr className={EstiloDashboard.hrContainer}/>
                        <div className={EstiloDashboard.containerCidadeUnidade}>

                        </div>
                        <div className={EstiloDashboard.containerComparativo}>

                        </div>
                        <div className={EstiloDashboard.containerAlunosCidade}>

                        </div>
                    </div>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    )
}