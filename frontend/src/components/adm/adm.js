import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ContainerCss from "../containers.module.css";
import EstiloAdm from "./adm.module.css";

import Background_Sistema from "../background/backSistema/backSistema";
import BarraLateral from "../barra_lateral/icons_barra_lateral";
import Notifica from "../sino_notificacao/notificacao";

export default function Adm() {
    const navigate = useNavigate();

    useEffect(() => {
        logado();
    });

    const logado = async () => {
        try {
            let response = await axios.post('/login');
            response = response.data;
            if(response.adm!==1){
                navigate('/home');
            }
        } catch (error) {
            navigate('/');
        }
    };

    return (
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloAdm.container_adm}>
                    <div className={EstiloAdm.display_grid}>
                        <div className={EstiloAdm.cards_adm} onClick={()=>navigate('/adm/adm_aluno')}>
                            <img src={require('../../imgs/icons/icon4.png')} alt="Aluno Img"/>
                            <h1>Alunos</h1>
                        </div>
                        <div className={EstiloAdm.cards_adm} onClick={()=>navigate('/adm/adm_prof')}>
                            <img src={require('../../imgs/icons/icon7.png')} alt="Prof Img"/>
                            <h1>Professores</h1>
                        </div>
                        <div className={EstiloAdm.cards_adm} onClick={()=>navigate('/adm/adm_unidade')}>
                            <img src={require('../../imgs/icons/icon5.png')} alt="Unidade Img"/>
                            <h1>Unidades</h1>
                        </div>
                        <div className={EstiloAdm.cards_adm} onClick={()=>navigate('/adm/adm_turmas')}>
                            <img src={require('../../imgs/icons/icon6.png')} alt="Turmas Img"/>
                            <h1>Turmas</h1>
                        </div>
                    </div>
                </div>
                <Notifica />
            </div>
        </div>
    );
}
