import React from "react"
import Email from "./input.module.css"

export default function email_input({value, setValue}){
    function salvar(e){
        let valor = e.target.value;
        setValue(valor);
    }

    return(
        <div className={Email.esquerda}>
            <label className={Email.label}><b>Email</b></label><br />
            <input type="email" id="email" placeholder="Insira um Email aqui" required className={Email.input} autoComplete="off" value={value} onChange={salvar}/><br />
        </div>
    )
}