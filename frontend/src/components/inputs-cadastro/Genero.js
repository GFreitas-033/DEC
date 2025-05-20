import React from "react";
import Genero from "./input.module.css";

export default function genero_input({ value, setValue }) {
    function salvar(e) {
        let valor = e.target.value;
        setValue(valor);
    }

    return (
        <div className={Genero.esquerda}>
            <label className={Genero.label}><b>Gênero</b></label><br />
            <select id="genero" className={`${Genero.input13} 
                ${Genero.inputPersonalizado}`} value={value} onChange={salvar}>
                <option value="" disabled>Selecionar</option>
                <option value="m">Masculino</option>
                <option value="f">Feminino</option>
            </select>
        </div>
    );
}
