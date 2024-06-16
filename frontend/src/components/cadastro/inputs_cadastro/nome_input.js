import React from "react"
import Nome from "./input.module.css"

export default function nome_input(){
    return(
        <div className={Nome.esquerda}>
            <label className={Nome.label}><b>Nome</b></label><br />
            <input type="text" id="nome" placeholder="Coloque seu nome completo" required className={Nome.input}/><br />
        </div>
    )
}