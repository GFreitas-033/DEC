import React from "react";
import Rg from "./input.module.css"

export default function Rg_input({ value, setValue, readOnly}) {

  function formatarRG(event) {
    if (!setValue) return; // só formata se for editável
    let r = event.target.value;
    r = r.replace(/\D+/g, "");
    r = r.replace(/^(\d{2})(\d)/, "$1.$2");
    r = r.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    r = r.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d{2})/, "$1.$2.$3-$4");
    if (r.length > 13) {
      r = r.substring(0, 13);
    }
    setValue(r);
  }

  return (
    <div className={Rg.esquerda}>
      <label className={Rg.label}><b>RG</b></label><br />
      <input 
        type="text" 
        id="rg" 
        placeholder="Insira um RG aqui" 
        required 
        className={Rg.input} 
        onChange={readOnly ? undefined : formatarRG} 
        value={value} 
        autoComplete="off"
        readOnly={readOnly}
      /><br />
    </div>
  );
}
