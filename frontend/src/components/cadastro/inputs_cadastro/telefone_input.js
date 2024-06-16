import React from "react"
import Telefone from "./input.module.css"

export default function Telefone_input(){
    return(
        <div className={Telefone.esquerda}>
            <label className={Telefone.label}><b>Telefone</b></label><br />
            <input type="text" id="Telefone" placeholder="Coloque seu Telefone" required className={Telefone.input}/><br />
        </div>
    )
}