import React from "react"
import Styles from "./form.module.css";

export default function Form(){
    return(
        <div>
            <div className={Styles.backgroundContainer}>
                <img src={require('../../imgs/background1.png')} alt="Background" className={Styles.responsiveImg} draggable="false"/>
            </div>
            <div className={Styles.container}>
                <form>
                    
                </form>
            </div>
        </div>
    )
}