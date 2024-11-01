import React from "react"
import DiaSemanaStyle from "../input.module.css"

export default function Dia_Semana_input(){
    return(
        <div className={DiaSemanaStyle.esquerda}> 
            <label className={DiaSemanaStyle.label} style={{marginRight: "0.5rem"}}><b>Dia da Semana</b></label><br />
            <select id="diaSemana" className={DiaSemanaStyle.input}>
                <option value="" selected disabled>Selecionar</option>
                <option value="segunda">Segunda</option>
                <option value="terça">Terça</option>
                <option value="quarta">Quarta</option>
                <option value="quinta">Quinta</option>
                <option value="sexta">Sexta</option>
                <option value="sábado">Sábado</option>
                <option value="domingo">Domingo</option>
            </select><br />
        </div>
    )
}