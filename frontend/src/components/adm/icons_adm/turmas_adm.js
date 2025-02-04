import React from "react"
import Style_adm from "./icons_adm.module.css"
import Turma from "../../../imgs/icons/icon6.png"
import { useNavigate} from "react-router-dom"

export default function Turmas_adm(){
    const navigate = useNavigate()

    return(
        <div className={Style_adm.cards_adm} onClick={()=>navigate('/adm/adm_turmas')}>
            <img src={Turma} alt=""/>
            <h1>Turmas</h1>
        </div>
    )
}