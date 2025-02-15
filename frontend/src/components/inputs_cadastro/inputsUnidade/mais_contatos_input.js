import React from "react"
import Mais from "../input.module.css"

export default function Mais_contatos_input({value, setValue}){
    function salvar(e){
        let valor = e.target.value;
        setValue(valor);
    }
    
    return(
        <div className={Mais.esquerda}>
            <label className={Mais.label}><b>Mais Contatos</b></label><br />
            <input type="text" id="maisContatos" placeholder="Caso Precise Informar Mais" className={Mais.input} value={value} onChange={salvar}/><br />
        </div>
    )
}