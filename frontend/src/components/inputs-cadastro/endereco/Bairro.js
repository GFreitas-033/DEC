import React from "react"
import Bairro from "../input.module.css"

export default function Bairro_input({value, setValue, readOnly}){

    function salvar(e) {
        let valor = e.target.value;
        setValue(valor);
    }

    return(
        <div className={Bairro.esquerda}>
            <label className={Bairro.label}><b>Bairro</b></label><br />
            <input type="text" id="bairro" required className={Bairro.input}
            onChange={salvar} value={value} autoComplete="off"
            readOnly={readOnly}/><br />
        </div>
    )
}