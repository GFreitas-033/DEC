import React from "react"
import Cidade from "../input.module.css"

export default function Cidade_input({value, setValue}){
    
    function salvar(e) {
        let valor = e.target.value;
        setValue(valor);
    }

    return(
        <div className={Cidade.esquerda}>
            <label className={Cidade.label}><b>Cidade</b></label><br />
            <input type="text" id="cidade" required className={Cidade.input}
            onChange={salvar} value={value} autoComplete="off"/><br />
        </div>
    )
}