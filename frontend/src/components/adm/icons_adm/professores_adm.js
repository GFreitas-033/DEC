import React from "react"
import Style_adm from "./icons_adm.module.css"
import Prof from "../../../imgs/icon7.png"
import { useNavigate } from "react-router-dom"

export default function Professores_adm(){
    const navigate = useNavigate()

    return(
        <div className={Style_adm.cards_adm} onClick={()=>navigate('/adm/adm_prof')}>
            <img src={Prof} alt=""/>
            <h1>Professores</h1>
        </div>
    )
}