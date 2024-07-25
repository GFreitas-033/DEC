import React from "react"
import DiaSemanaStyle from "../input.module.css"

export default function Dia_Semana_input(){
    return(
        <div className={DiaSemanaStyle.esquerda}> 
            <label className={DiaSemanaStyle.label} style={{marginRight: "0.5rem"}}><b>Dia da Semana</b></label><br />
            <select name="diaSemana" className={DiaSemanaStyle.input}>
                <option value="" selected disabled>Selecionar</option>
                <option value="Segunda">Segunda</option>
                <option value="Terça">Terça</option>
                <option value="Quarta">Quarta</option>
                <option value="Quinta">Quinta</option>
                <option value="Sexta">Sexta</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
            </select><br />
        </div>
    )
}