import React from "react"
import Rua from "../input.module.css"

export default function Rua_input({value, setValue}){
    
    function salvar(e) {
        let valor = e.target.value;
        setValue(valor);
    }

    return(
        <div className={Rua.esquerda}>
            <label className={Rua.label}><b>Rua</b></label><br />
            <input type="text" id="rua" required className={Rua.input} onChange={salvar} value={value} autoComplete="off"/><br/>
        </div>
    )
}