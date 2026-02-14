import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import EstiloHome from "./home.module.css";
import ContainerCss from "../containers.module.css";

import BackgroundSistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnInstalar from "../btn-instalar-app/InstalarApp";

export default function Home() {
    const { user } = useOutletContext();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("Carregando.");

    useEffect(() => {
        if (user && user.nome) {
            setMessage(user.nome);
        }

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200); // Keep loading for a bit for UX

        return () => clearTimeout(timer);
    }, [user]);

    useEffect(() => {
        if (!loading) return;

        const loadingTexts = ['Carregando.', 'Carregando..', 'Carregando...'];
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % loadingTexts.length;
            setLoadingText(loadingTexts[currentIndex]);
        }, 500);

        return () => clearInterval(interval);
    }, [loading]);

    return (
        <div>
            <BackgroundSistema />
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
                <BtnInstalar />
            </div>
        </div>

    )
}
