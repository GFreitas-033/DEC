import React from "react"
import Rua from "../input.module.css"

export default function rua_input(){
    return(
        <div className={Rua.esquerda}>
            <label className={Rua.label}><b>Rua</b></label><br />
            <input type="text" id="rua" placeholder="Coloque sua rua" required className={Rua.input}/><br />
        </div>
    )
}