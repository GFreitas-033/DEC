import React from "react"
import Cidade from "../input.module.css"

export default function cidade_input(){
    return(
        <div className={Cidade.esquerda}>
            <label className={Cidade.label}><b>Cidade</b></label><br />
            <input type="text" id="cidade" placeholder="Coloque sua cidade" required className={Cidade.input}/><br />
        </div>
    )
}