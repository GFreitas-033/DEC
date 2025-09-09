import React from "react";
import Telefone from "./input.module.css";

export default function Telefone_input({ value, setValue, readOnly}) {

  const formatarTelefone = (t) => {
    if (!t) return "";
    t = t.replace(/\D+/g, "");
    t = t.replace(/(\d{2})(\d)/, "($1) $2");
    t = t.replace(/(\d{5})(\d)/, "$1-$2");
    return t.substring(0, 15);
  };

  const handleChange = (event) => {
    if (!setValue) return;
    const t = formatarTelefone(event.target.value);
    setValue(t);
  };

  return (
    <div className={Telefone.esquerda}>
      <label className={Telefone.label}><b>Telefone/Whatsapp</b></label><br />
      <input 
        type="text" 
        id="telefone/Whatsapp" 
        placeholder="Insira um Telefone/Whatsapp aqui" 
        required 
        className={Telefone.input} 
        onChange={readOnly ? undefined : handleChange} 
        value={formatarTelefone(value)} 
        autoComplete="off"
        readOnly={readOnly}
      /><br />
    </div>
  );
}
