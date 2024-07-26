import React from "react"
import Dt_nasc from "./input.module.css"

export default function Dt_nasc_input(){
    return(
        <div className={Dt_nasc.esquerda}>
            <label className={Dt_nasc.label}><b>Data de Nascimento</b></label><br />
            <input type="date" id="dt_nasc" required className={Dt_nasc.input}/><br />
        </div>
    )
}