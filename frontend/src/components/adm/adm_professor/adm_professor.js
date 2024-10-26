import React, { useEffect } from "react";
import ContainerCss from "../../containers.module.css";
import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import ContentAdmProfessor from "./content_adm_professor"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notifica from "../../sino_notificacao/notificacao"

export default function Adm_prof(){
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

    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentAdmProfessor />
            <Notifica />
        </div>
    )
}