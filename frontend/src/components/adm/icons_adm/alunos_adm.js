import React from "react"
import Style_adm from "./icons_adm.module.css"
import Alunos from "../../../imgs/icon4.png"

export default function Alunos_adm(){
    return(
        <div className={Style_adm.cards_adm}>
            <img src={Alunos} alt=""/>
            <h1>Alunos</h1>
        </div>
    )
}