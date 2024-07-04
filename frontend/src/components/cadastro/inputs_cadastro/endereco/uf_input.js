import React from "react"
import Uf from "../input.module.css"

export default function uf_input(){
    return(
        <div className={Uf.esquerda}>
            <label className={Uf.label}><b>UF</b></label><br />
            <input type="text" id="uf" placeholder="Coloque sua Uf" required className={Uf.input}/><br />
        </div>
    )
}