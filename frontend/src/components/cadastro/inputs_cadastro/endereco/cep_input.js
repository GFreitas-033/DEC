import React from "react"
import Cep from "../input.module.css"

export default function cep_input(){
    return(
        <div className={Cep.esquerda}>
            <label className={Cep.label}><b>Cep</b></label><br />
            <input type="text" id="cep" placeholder="Coloque seu Cep" required className={Cep.input}/><br />
        </div>
    )
}