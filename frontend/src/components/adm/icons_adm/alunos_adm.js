import React from "react"
import Style_adm from "./icons_adm.module.css"
import Alunos from "../../../imgs/icon4.png"
import { useNavigate} from "react-router-dom"

export default function Alunos_adm(){
        const navigate = useNavigate()
        
    return(
        <div className={Style_adm.cards_adm} onClick={()=>navigate('/adm/adm_aluno')}>
            <img src={Alunos} alt=""/>
            <h1>Alunos</h1>
        </div>
    )
}