import React, { useEffect } from "react";
import EstiloBack from "../background.module.css";

export default function Background_Sistema(){
    useEffect(() => {
        const imgDesk = new Image();
        const imgMob = new Image();

        imgDesk.src = require("../../../imgs/backgroundDesktop/backSistemaDesk.png");
        imgMob.src = require("../../../imgs/backgroundMobile/backSistemaMob.png");
    }, []);

    return(
        <div className={EstiloBack.backgroundContainer}>
            <img
                src={require("../../../imgs/backgroundDesktop/backSistemaDesk.png")}
                alt="Background Desktop"
                className={EstiloBack.responsiveImg}
                id={EstiloBack.backDesk}
                draggable="false"
                loading="eager"
            />
            <img
                src={require("../../../imgs/backgroundMobile/backSistemaMob.png")}
                alt="Background Mobile"
                className={EstiloBack.responsiveImg}
                id={EstiloBack.backMob}
                draggable="false"
                loading="eager"
            />
        </div>
    );
}