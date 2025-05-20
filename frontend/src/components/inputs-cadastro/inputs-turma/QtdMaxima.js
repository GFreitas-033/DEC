import React from "react"
import MaximoStyle from "../input.module.css"

export default function Qtd_Maxima_input({value,setValue}){
   
    function salvar(e){
        let valor = e.target.value;
        setValue(valor);
    }

    return(
        <div className={MaximoStyle.esquerda}>
            <label className={MaximoStyle.label}><b>Máximo de Alunos</b></label><br />
            <input type="number" id="Maximo" required className={MaximoStyle.input} value={value} onChange={salvar}/><br />
        </div>
    )
}