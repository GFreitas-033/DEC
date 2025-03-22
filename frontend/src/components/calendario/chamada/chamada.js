import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import EstiloChamada from "./chamada.module.css"
import ContainerCss from "../../containers.module.css";

import Background_Sistema from "../../background/backSistema/backSistema";
import Barra_lateral from "../../barra_lateral/icons_barra_lateral";
import Notifica from "../../sino_notificacao/notificacao";

export default function Chamada() {
    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <Barra_lateral />
                <div className={EstiloChamada.ajuste}>
                    <div className={EstiloChamada.container_chamada}>
                        <table className={EstiloChamada.tabela}>
                            <thead>
                                <tr>
                                    <td className={EstiloChamada.colunaId}>
                                        <p><b><u>Presença</u></b></p>
                                    </td>
                                    <td className={EstiloChamada.colunaNome}>
                                        <p><b><u>Nome</u></b></p>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={EstiloChamada.colunaId}>
                                        <input type="checkbox" checked />
                                    </td>
                                    <td>
                                        Fulano
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Notifica />
            </div>
        </div>
    )
}