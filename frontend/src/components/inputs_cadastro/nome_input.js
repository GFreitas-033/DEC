import React from "react"
import Nome from "./input.module.css"

export default function nome_input({value, setValue}){
    function salvar(e){
        let valor = e.target.value;
        setValue(valor);
    }

    return(
        <div className={Nome.esquerda}>
            <label className={Nome.label}><b>Nome</b></label><br />
            <input type="text" id="nome" placeholder="Insira um nome completo" required className={Nome.input} autoComplete="off" value={value} onChange={salvar}/><br />
        </div>
    )
}