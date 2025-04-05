import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import EstiloChamada from "./chamada.module.css"
import ContainerCss from "../../containers.module.css";

import Background_Sistema from "../../background/backSistema/backSistema";
import Barra_lateral from "../../barra_lateral/icons_barra_lateral";
import Notifica from "../../sino_notificacao/notificacao";
import BtnVoltar from "../../btnVoltar/btnVoltar";

export default function Chamada() {
    // Função teste, pode apagar se quiser
    const [trocar, setTrocar] = useState(true)

    const enviarChamada = () => {
        Swal.fire({
            title: "Deseja Confirmar o Envio da Chamada?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Chamada Registrada com Sucesso!",
                    icon: "success"
                });
            }
        });
    }

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
                                    <td className={EstiloChamada.colunaPresenca}>
                                        <p><b><u>Presença</u></b></p>
                                    </td>
                                    <td className={EstiloChamada.colunaNome}>
                                        <p><b><u>Nome</u></b></p>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={EstiloChamada.colunaPresenca}>
                                        <input type="checkbox" />
                                    </td>
                                    <td>
                                        Samuel Ferreira
                                    </td>
                                </tr>
                                <tr>
                                    <td className={EstiloChamada.colunaPresenca}>
                                        <input type="checkbox" />
                                    </td>
                                    <td>
                                        André Silva
                                    </td>
                                </tr>
                                <tr>
                                    <td className={EstiloChamada.colunaPresenca}>
                                        <input type="checkbox" />
                                    </td>
                                    <td>
                                        ARTHUR VENEZUELA MARTINS FERREIRA DE MORAES
                                    </td>
                                </tr>
                                <tr>
                                    <td className={EstiloChamada.colunaPresenca}>
                                        <input type="checkbox" />
                                    </td>
                                    <td>
                                        DARTAGNAN EDUARDO MARTINS MENEZES FONN
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={EstiloChamada.divObservacao}>
                            <p className={EstiloChamada.status}>
                                Status: 
                                <span className={trocar? EstiloChamada.azul : EstiloChamada.vermelho}>
                                    {trocar?" Finalizada" : " A ser Feita"}
                                </span>
                            </p>
                            <input type="date" className={EstiloChamada.inputData} />
                            <label className={EstiloChamada.labelObservacao}>Observações</label>
                            <textarea type="text" className={EstiloChamada.inputObservacao} 
                            placeholder="Digite sua observação aqui..."></textarea>
                            <div className={EstiloChamada.divbtnEnviar}>
                                <button className={EstiloChamada.btnEnviarChamada}
                                onClick={enviarChamada}>
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    )
}