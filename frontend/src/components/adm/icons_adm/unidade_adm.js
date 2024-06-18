import React from "react"
import Style_adm from "./icons_adm.module.css"
import Unidade from "../../../imgs/icon5.png"

export default function Unidade_adm(){
    return(
        <div className={Style_adm.cards_adm}>
            <img src={Unidade} alt=""/>
            <h1>Unidades</h1>
        </div>
    )
}