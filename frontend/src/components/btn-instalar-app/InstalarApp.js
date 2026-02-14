import React, { useState, useEffect } from "react";
import EstiloBtnInstalar from "./instalar.module.css";

export default function BtnInstalar() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;

        setDeferredPrompt(null);
    };

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    return (
        <div className={EstiloBtnInstalar.containerBtnInstalar} onClick={handleInstall}>
            <img src={require('../../imgs/icons/seta-esquerda.png')}
                className={EstiloBtnInstalar.setaImg} alt="instalar" />
            <p>
                <b>Instalar Aplicativo</b>
            </p>
        </div>
    )
}