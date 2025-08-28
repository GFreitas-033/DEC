import React from "react";
import EstiloBack from "./background.module.css";

export default function Background_Sistema(){
    return(
        <div className={EstiloBack.backgroundContainer}>
            <img
                src="/backgroundDesktop/backSistemaDesk.webp"
                alt="Background Desktop"
                className={EstiloBack.responsiveImg}
                id={EstiloBack.backDesk}
                draggable="false"
                loading="eager"
            />
            <img
                src="/backgroundMobile/backSistemaMob.webp"
                alt="Background Mobile"
                className={EstiloBack.responsiveImg}
                id={EstiloBack.backMob}
                draggable="false"
                loading="eager"
            />
        </div>
    );
}