import React, { useEffect } from "react";
import Cep from "../input.module.css";

export default function Cep_input({ onBuscarCep, value, setValue }) {

    const buscarCep = (event) => {

        let c = event.target.value;
        c = c.replace(/\D/g, "");
        c = c.replace(/^(\d{5})(\d)/, "$1-$2");
        
        if (c.length > 9) {
            c = c.substring(0, 9);
        }
        if(c.length === 9){
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
                    onChange={buscarCep}
                    value={value}
                    autoComplete="off"
                />
                <br />
            </div>
        </div>
    );
}
