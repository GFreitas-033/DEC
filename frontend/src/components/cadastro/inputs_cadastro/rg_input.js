import React from "react"
import Rg from "./input.module.css"

export default function Rg_input(){
    return(
        <div className={Rg.esquerda}>
            <label className={Rg.label}><b>RG</b></label><br />
            <input type="text" id="Rg" placeholder="Coloque seu Rg" required className={Rg.input}/><br />
        </div>
    )
}