import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "./home.module.css";

export default function Content_home() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loadingText, setLoadingText] = useState("Carregando.");

    useEffect(() => {
        logado();
        const timer = setTimeout(() => {
            if (dataLoaded) {
                setLoading(false);
            }
        }, 1200);

        return () => clearTimeout(timer);
    }, [dataLoaded]);


    useEffect(() => {
        const loadingTexts = ['Carregando.', 'Carregando..', 'Carregando...'];
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % loadingTexts.length;
            setLoadingText(loadingTexts[currentIndex]);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const logado = async () => {
        try {
            let response = await axios.post('/login');
            setMessage(response.data);
            setDataLoaded(true);
        } catch (error) {
            window.location.href = window.location.href.replace("home", "");
        }
    };

    return (
        <div className={Home.container_home}>
            {loading ? (
                <h1 className={Home.helloworld}>{loadingText}</h1>
            ) : (
                <h1 className={Home.helloworld}>Bem-Vindo!<br /> {message}</h1>
            )}
        </div>
    );
}
