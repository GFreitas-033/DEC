import React from "react"
import UnidadeStyle from "../input.module.css"

export default function Unidade_input(){
    return(
        <div className={UnidadeStyle.esquerda}>
            <label className={UnidadeStyle.label}><b>Unidade</b></label><br />
            <select name="SelecaoUnidade" className={UnidadeStyle.input}>
                <option value="" selected disabled>Selecionar</option>
                <option value="Bauru">Bauru</option>
                <option value="DEC">DEC</option>
                <option value="Genoveva">Genoveva</option>
            </select><br />
        </div>
    )
}