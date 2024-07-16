import React from "react"
import Texto from "./texto_cadastro.module.css"

export default function Texto_logar(props){
    return(
        <div className={Texto.textcenter}>
            <h1>{props.text}</h1>
        </div>
    )
}