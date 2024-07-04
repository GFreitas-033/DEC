import React from "react"
import Bairro from "../input.module.css"

export default function bairro_input(){
    return(
        <div className={Bairro.esquerda}>
            <label className={Bairro.label}><b>Bairro</b></label><br />
            <input type="text" id="bairro" placeholder="Coloque seu Bairro" required className={Bairro.input}/><br />
        </div>
    )
}