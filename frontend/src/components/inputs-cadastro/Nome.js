import React from "react"
import Nome from "./input.module.css"

export default function nome_input({value, setValue, texto, readOnly}){
    function salvar(e){
        if (setValue) { // só altera se vier setValue
            let valor = e.target.value;
            setValue(valor);
        }
    }

    return(
        <div className={Nome.esquerda}>
            <label className={Nome.label}><b>Nome {texto}</b></label><br />
            <input type="text" id="nome" placeholder="Insira um nome completo aqui" 
            required className={Nome.input} autoComplete="off" value={value} onChange={salvar}
            readOnly={readOnly} /><br />
        </div>
    )
}