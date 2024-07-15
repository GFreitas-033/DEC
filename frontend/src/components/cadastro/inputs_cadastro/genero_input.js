import React from "react"
import Genero from "./input.module.css"

export default function genero_input(){
    return(
        <div className={Genero.esquerda}>
            <label className={Genero.label}><b>Gênero</b></label><br />
            <select name="Genero" className={Genero.input}>
                <option value="" selected disabled>Selecionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
            </select>
        </div>
    )
}