import React from "react";
import EstiloBack from "./background.module.css";

export default function Background(){
    return(
        <div className={EstiloBack.backgroundContainer}>
            <img src={require('../../imgs/backgroundDesktop/backNormal.png')} 
              alt="Background" className={EstiloBack.responsiveImg} id={EstiloBack.backDesk} 
              draggable="false"
            />
            <img src={require('../../imgs/backgroundMobile/backNormalMob.png')} 
              alt="Background" className={EstiloBack.responsiveImg} id={EstiloBack.backMob} 
              draggable="false"
            />
        </div>
    )
}