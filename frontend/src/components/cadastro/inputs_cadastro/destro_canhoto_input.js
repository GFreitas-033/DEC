import React from "react"
import DestroCanhoto from "./input.module.css"

export default function DestroCanhoto_input(){
    return(
        <div className={DestroCanhoto.esquerda}>
            <label className={DestroCanhoto.label}><b>Mão Dominante</b></label><br />
            <select name="Mão Dominante" className={DestroCanhoto.input}>
                <option value="" selected disabled>Selecionar</option>
                <option value="Destro">Destro</option>
                <option value="Canhoto">Canhoto</option>
            </select>
        </div>
    )
}