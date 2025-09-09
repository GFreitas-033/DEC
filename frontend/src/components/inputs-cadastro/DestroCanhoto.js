import React from "react"
import DestroCanhoto from "./input.module.css"

export default function DestroCanhoto_input({ value, setValue, disabled}){
    function salvar(e) {
        let valor = e.target.value;
        setValue(valor);
    }

    return(
        <div className={DestroCanhoto.esquerda}>
            <label className={DestroCanhoto.label}><b>Mão Dominante</b></label><br />
            <select id="maodominante" className={`${DestroCanhoto.input} ${DestroCanhoto.input13}`}  
            value={value} onChange={salvar} disabled={disabled}>
                <option value="" disabled>Selecionar</option>
                <option value="d">Direita</option>
                <option value="c">Esquerda</option>
            </select>
        </div>
    )
}