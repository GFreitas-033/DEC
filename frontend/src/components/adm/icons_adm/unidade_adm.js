import React from "react"
import Style_adm from "./icons_adm.module.css"
import Unidade from "../../../imgs/icons/icon5.png"
import { useNavigate} from "react-router-dom"

export default function Unidade_adm(){
    const navigate = useNavigate()

    return(
        <div className={Style_adm.cards_adm} onClick={()=>navigate('/adm/adm_unidade')}>
            <img src={Unidade} alt=""/>
            <h1>Unidades</h1>
        </div>
    )
}