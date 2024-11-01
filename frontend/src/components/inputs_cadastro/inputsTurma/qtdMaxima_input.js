import React from "react"
import MaximoStyle from "../input.module.css"

export default function Qtd_Maxima_input(){
    return(
        <div className={MaximoStyle.esquerda}>
            <label className={MaximoStyle.label}><b>Máximo de Alunos</b></label><br />
            <input type="number" id="Maximo" required className={MaximoStyle.input}/><br />
        </div>
    )
}