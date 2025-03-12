import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import EstiloHome from "./home.module.css";
import ContainerCss from "../containers.module.css";

import Background_Sistema from "../background/backSistema/backSistema";
import BarraLateral from "../barra_lateral/icons_barra_lateral";
import Notifica from "../sino_notificacao/notificacao";

export default function Home(){
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loadingText, setLoadingText] = useState("Carregando.");
    const navigate = useNavigate();

    useEffect(() => {
        const logado = async () => {
            try {
                let response = await axios.post('/login');
                response = response.data;
                setMessage(response.nome);
                setDataLoaded(true);
            } catch (error) {
                navigate('/');
            }
        };

        logado();

        const timer = setTimeout(() => {
            if (dataLoaded) {
                setLoading(false);
            }
        }, 1200);

        return () => clearTimeout(timer);
    }, [dataLoaded, navigate]);

    useEffect(() => {
        const loadingTexts = ['Carregando.', 'Carregando..', 'Carregando...'];
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % loadingTexts.length;
            setLoadingText(loadingTexts[currentIndex]);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloHome.container_home}>
                    {loading ? (
                        <h1 className={EstiloHome.helloworld}>{loadingText}</h1>
                    ) : (
                        <h1 className={EstiloHome.helloworld}>
                            Bem-Vindo(a)!
                        <br /> {message}</h1>
                    )}
                </div>
                <Notifica />
            </div>            
        </div>

    )
}