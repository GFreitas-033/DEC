import React from "react"
import HorarioStyle from "../input.module.css"

export default function Horario_input(){
    return(
        <div className={HorarioStyle.esquerda}>
            <label className={HorarioStyle.label}>
                <b>Horario</b>
            </label><br />
            <input type="time" id="Horario" required 
                className={`${HorarioStyle.input13} ${HorarioStyle.inputPersonalizado}`}/><br />
        </div>
    )
}