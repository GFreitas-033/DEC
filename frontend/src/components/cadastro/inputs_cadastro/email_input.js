import React from "react"
import Email from "./input.module.css"

export default function email_input(){
    return(
        <div className={Email.esquerda}>
            <label className={Email.label}><b>Email</b></label><br />
            <input type="email" id="email" placeholder="Insira um Email aqui" required className={Email.input}/><br />
        </div>
    )
}