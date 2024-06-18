import React from "react"
import Submit from "./submit_cadastro.module.css"

export default function Submit_logar(){

    return(
        <div>
            <button type="submit" className={Submit.btn}>
                <h1>Cadastrar</h1>
            </button>
        </div>
    )
}