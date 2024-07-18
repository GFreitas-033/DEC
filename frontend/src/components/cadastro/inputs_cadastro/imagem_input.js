import React from "react"
import ImagemStyle from "./input.module.css"

export default function Imagem_input(){
    return(
        <div className={ImagemStyle.esquerda}>
            <label className={ImagemStyle.label}><b>Imagem</b></label><br />
            <input type="file" id="imagem" required className={ImagemStyle.input}/>
        </div>
    )
}