import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContainerCss from "../containers.module.css";
import BarraLateral from "../barra_lateral/icons_barra_lateral";
import ContentAdm from "./content_adm";
import axios from "axios";

export default function Adm() {
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

    return (
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentAdm />
        </div>
    );
}
