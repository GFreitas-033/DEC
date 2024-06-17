import React from "react"
import Style_adm from "./icons_adm.module.css"
import Prof from "../../../imgs/icon7.png"

export default function Professores_adm(){
    return(
        <div className={Style_adm.cards_adm}>
            <img src={Prof} />
            <h1>Professores</h1>
        </div>
    )
}