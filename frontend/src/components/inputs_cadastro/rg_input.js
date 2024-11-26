import React from "react";
import Rg from "./input.module.css";

export default function Rg_input({ value, setValue }) {

  function formatarRG(event) {
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
        placeholder="Insira um Rg aqui" 
        required 
        className={Rg.input} 
        onChange={formatarRG} 
        value={value} 
        autoComplete="off"
      /><br />
    </div>
  );
}
