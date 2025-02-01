import React from "react";
import Telefone from "./input.module.css";

export default function Telefone_input({ value, setValue }) {

  function formatarTel(event) {
    let t = event.target.value;
    t = t.replace(/\D+/g, "");
    t = t.replace(/(\d{2})(\d)/, "($1) $2");
    t = t.replace(/(\d{5})(\d)/, "$1-$2");
    if (t.length > 15) {
      t = t.substring(0, 15);
    }
    setValue(t);
  }

  return (
    <div className={Telefone.esquerda}>
      <label className={Telefone.label}><b>Telefone</b></label><br />
      <input 
        type="text" 
        id="telefone/Whatsapp" 
        placeholder="Insira um Telefone/Whatsapp aqui" 
        required 
        className={Telefone.input} 
        onChange={formatarTel} 
        value={value} 
        autoComplete="off"
      /><br />
    </div>
  );
}
