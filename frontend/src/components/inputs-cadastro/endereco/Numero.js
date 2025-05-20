import React from "react"
import Numero from "../input.module.css"

export default function Numero_input({value, setValue}){
    function salvar(e){
        let valor = e.target.value;
        setValue(valor);
    }

    return(
        <div className={Numero.esquerda}>
            <label className={Numero.label}><b>Número</b></label><br />
            <input type="number" id="numero" required className={Numero.input} autoComplete="off" value={value} onChange={salvar}/><br />
        </div>
    )
}