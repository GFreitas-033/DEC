import React, { useEffect } from "react";
import ContainerCss from "../../containers.module.css";
import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import ContentAdmProfessor from "./content_adm_professor"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Adm_prof(){
    const navigate = useNavigate();


    useEffect(() => {
        logado();
    });

    const logado = async () => {
        try {
            let response = await axios.post('/login');
        } catch (error) {
            navigate('/');
        }
    };

    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentAdmProfessor />
        </div>
    )
}