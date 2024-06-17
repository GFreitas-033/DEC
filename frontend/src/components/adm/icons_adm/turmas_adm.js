import React from "react"
import Style_adm from "./icons_adm.module.css"
import Turma from "../../../imgs/icon6.png"

export default function Turmas_adm(){
    return(
        <div className={Style_adm.cards_adm}>
            <img src={Turma} />
            <h1>Turmas</h1>
        </div>
    )
}