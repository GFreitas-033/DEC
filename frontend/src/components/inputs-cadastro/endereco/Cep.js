import React from "react";
import Cep from "../input.module.css"

export default function Cep_input({ onBuscarCep, value, setValue, readOnly}) {
    const formatarCep = (c) => {
        if (!c) return "";
        c = c.replace(/\D/g, "");
        c = c.replace(/^(\d{5})(\d)/, "$1-$2");
        return c.substring(0, 9);
    };

    const buscarCep = (event) => {
        if (!setValue) return; // só formata se for editável
        let c = formatarCep(event.target.value);
        if(c.length === 9 && onBuscarCep){
            onBuscarCep(c);
        }       
        setValue(c);
    };

    return (
        <div>
            <div className={Cep.esquerda}>
                <label className={Cep.label}><b>Cep</b></label><br />
                <input
                    type="text"
                    id="cep"
                    placeholder="Insira um Cep aqui"
                    required
                    className={Cep.input}
                    onChange={readOnly ? undefined : buscarCep}
                    value={formatarCep(value)}
                    autoComplete="off"
                    readOnly={readOnly}
                />
                <br />
            </div>
        </div>
    );
}
