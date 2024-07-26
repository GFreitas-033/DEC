import React from "react"
import Genero from "./input.module.css"

export default function genero_input(){
    return(
        <div className={Genero.esquerda}>
            <label className={Genero.label}><b>Gênero</b></label><br />
            <select id="genero" className={Genero.input}>
                <option value="" selected disabled>Selecionar</option>
                <option value="m">Masculino</option>
                <option value="f">Feminino</option>
            </select>
        </div>
    )
}