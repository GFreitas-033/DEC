import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ContainerCss from "../containers.module.css";
import EstiloAdm from "./adm.module.css";

import Background_Sistema from "../background/backSistema/backSistema";
import BarraLateral from "../barra_lateral/icons_barra_lateral";
import Notifica from "../sino_notificacao/notificacao";

export default function Adm() {
    const [mostrar, setMostrar] = useState(false)
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

    const ApareceSome = () => {
        setMostrar(!mostrar);
    };

    return (
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                {mostrar && (
                    <>
                        <div className={EstiloAdm.fundoEscuro} onClick={()=>ApareceSome()}></div>
                        <div className={EstiloAdm.divCadastros}>
                            <h1 className={EstiloAdm.titulo}>Cadastros</h1>
                            <div className={EstiloAdm.divNavegacao}>
                                <button onClick={()=>navigate('/matricula')} 
                                    className={EstiloAdm.btnNavegacao}>
                                    Alunos Pagantes
                                </button>
                                <button onClick={()=>navigate('/cadastro')} 
                                    className={EstiloAdm.btnNavegacao}>
                                    Alunos Não Pagante
                                </button>
                                <button onClick={()=>navigate('/cadastro/aluno/Escola')} 
                                    className={EstiloAdm.btnNavegacao}>
                                    Alunos de Escolas
                                </button>
                                <button onClick={()=>navigate('/cadastro/professor')} 
                                    className={EstiloAdm.btnNavegacao}>
                                    Professores
                                </button>
                                <button onClick={()=>navigate('/cadastro/unidade')} 
                                    className={EstiloAdm.btnNavegacao}>
                                    Unidades
                                </button>
                                <button onClick={()=>navigate('/cadastro/turma')} 
                                    className={EstiloAdm.btnNavegacao}>
                                    Turmas
                                </button>
                            </div>
                            <img src={require('../../imgs/icons/cancelar.png')} 
                            className={EstiloAdm.imgFechar}
                            onClick={()=>ApareceSome()}/>
                        </div>
                    </>
                )}
                <div className={EstiloAdm.container_adm}>
                    <div className={EstiloAdm.divCards}>
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
                        <div className={EstiloAdm.cards_adm} onClick={()=>ApareceSome()}>
                            <img src={require('../../imgs/icons/mais.png')} alt="Cadastro Img"/>
                            <h1>Cadastros</h1>
                        </div>
                    </div>
                </div>
                <Notifica />
            </div>
        </div>
    );
}
