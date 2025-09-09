import React from "react"
import Uf from "../input.module.css"

export default function Uf_input({value, setValue, readOnly}){

    function salvar(e) {
        let valor = e.target.value;
        setValue(valor);
    }

    return(
        <div className={Uf.esquerda}>
            <label className={Uf.label}><b>UF</b></label><br />
            <input type="text" id="uf" required className={Uf.input}
            onChange={salvar} value={value} autoComplete="off"
            readOnly={readOnly}/><br />
        </div>
    )
}