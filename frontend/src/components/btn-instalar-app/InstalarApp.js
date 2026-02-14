import React, { useState, useEffect } from "react";
import EstiloBtnInstalar from "./instalar.module.css";

export default function BtnInstalar() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [canInstall, setCanInstall] = useState(false);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;

        if (choice.outcome === "accepted") {
            console.log("Usuário instalou");
        }

        setDeferredPrompt(null);
        setCanInstall(false);
    };

    useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setCanInstall(false);
            return;
        }

        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setCanInstall(true);
        };

        window.addEventListener("beforeinstallprompt", handler);

        window.addEventListener("appinstalled", () => {
            setCanInstall(false);
            console.log("App instalado");
        });

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    if (!canInstall) return null;

    return (
        <div className={EstiloBtnInstalar.containerBtnInstalar} onClick={handleInstall}>
            <img src={require('../../imgs/icons/download.png')}
                className={EstiloBtnInstalar.setaImg} alt="instalar" />
            <p>
                <b>Instalar Aplicativo</b>
            </p>
        </div>
    )
}