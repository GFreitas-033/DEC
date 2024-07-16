import React from "react"
import Submit from "./submit_cadastro.module.css"

export default function Submit_logar(props){

    return(
        <div>
            <button type="submit" className={Submit.btn}>
                <h1>{props.text}</h1>
            </button>
        </div>
    )
}