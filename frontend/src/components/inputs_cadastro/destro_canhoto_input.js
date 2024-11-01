import React from "react"
import DestroCanhoto from "./input.module.css"

export default function DestroCanhoto_input(){
    return(
        <div className={DestroCanhoto.esquerda}>
            <label className={DestroCanhoto.label}><b>Mão Dominante</b></label><br />
            <select id="maodominante" className={DestroCanhoto.input}>
                <option value="" selected disabled>Selecionar</option>
                <option value="d">Destro</option>
                <option value="c">Canhoto</option>
            </select>
        </div>
    )
}