import React from "react"
import DestroCanhoto from "./input.module.css"

export default function DestroCanhoto_input({ value, setValue }){
    function salvar(e) {
        let valor = e.target.value;
        setValue(valor);
    }

    return(
        <div className={DestroCanhoto.esquerda}>
            <label className={DestroCanhoto.label}><b>Mão Dominante</b></label><br />
            <select id="maodominante" className={DestroCanhoto.input} value={value} onChange={salvar}>
                <option value="" selected disabled>Selecionar</option>
                <option value="d">Direita</option>
                <option value="c">Esquerda</option>
            </select>
        </div>
    )
}