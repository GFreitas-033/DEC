import React, { useState, useEffect } from "react";
import Cep from "../input.module.css";

export default function Cep_input({ onBuscarCep, value, setValue }) {
    
    useEffect(() => {
        if (value.length === 9) {
            onBuscarCep(value);
        }
    }, [value, onBuscarCep]);

    const buscarCep = (event) => {
        let c = event.target.value;
        c = c.replace(/\D/g, "");
        c = c.replace(/^(\d{5})(\d)/, "$1-$2");

        if (c.length > 9) {
            c = c.substring(0, 9);
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
