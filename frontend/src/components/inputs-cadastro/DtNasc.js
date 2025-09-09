import React from "react"
import Dt_nasc from "./input.module.css"

export default function Dt_nasc_input({ value, setValue, readOnly}){
    function formatarDate(event) {
        if (!setValue) return; // só formata se for editável
        let dt = event.target.value;
        dt = dt.replace(/\D+/g, "");   
        dt = dt.replace(/(\d{2})(\d)/, "$1/$2");
        dt = dt.replace(/(\d{2})(\d)/, "$1/$2");
        if (dt.length > 10) {
          dt = dt.substring(0, 10);
        }
        setValue(dt);
    }

    return(
        <div className={Dt_nasc.esquerda}>
            <label className={Dt_nasc.label}><b>Data Nascimento</b></label><br />
            <input 
                type="text" 
                id="dt_nasc" 
                placeholder="XX/XX/XXXX" 
                required 
                className={Dt_nasc.input}
                onChange={readOnly ? undefined : formatarDate} 
                value={value} 
                autoComplete="off"
                readOnly={readOnly}
            /><br />
        </div>
    )
}