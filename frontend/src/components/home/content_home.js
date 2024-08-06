import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "./home.module.css";

export default function Content_home() {
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

    return (
        <div className={Home.container_home}>
            {loading ? (
                <h1 className={Home.helloworld}>{loadingText}</h1>
            ) : (
                <h1 className={Home.helloworld}>
                    Bem-Vindo(a)!
                <br /> {message}</h1>
            )}
        </div>
    );
}
