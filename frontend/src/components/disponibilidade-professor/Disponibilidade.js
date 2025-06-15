import React from "react";

import ContainerCss from "../containers.module.css";
import EstiloDispo from "./disponibilidade.module.css";

import Background_Sistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

export default function Disponibilidade_Prof(){
    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloDispo.container_Dispo}>
                    <div className={EstiloDispo.divInput}>
                        <select className={EstiloDispo.inputSelect}>
                            <option value="">Selecionar Unidade</option>
                                
                        </select>                              
                    </div>
                    <div className={EstiloDispo.divCalendario}>

                    </div>
                </div>
            </div>
            <Notifica />
            <BtnVoltar />
        </div>
    )
}