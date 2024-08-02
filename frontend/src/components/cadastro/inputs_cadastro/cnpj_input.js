import React from "react";
import Cnpj from "./input.module.css";

export default function Cnpj_input({ value, setValue }) {

  const handleCnpjChange = (event) => {
    let c = event.target.value;
    c = c.replace(/\D+/g, "");
    c = c.replace(/^(\d{2})(\d)/, "$1.$2");
    c = c.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    c = c.replace(/\.(\d{3})(\d)/, ".$1/$2");
    c = c.replace(/(\d{4})(\d)/, "$1-$2");
    if (c.length > 18) {
      c = c.substring(0, 18);
    }
    setValue(c);
  };

  return (
    <div className={Cnpj.esquerda}>
      <label className={Cnpj.label}><b>CNPJ</b></label><br />
      <input 
        type="text" 
        id="cnpj" 
        placeholder="Insira um CNPJ aqui" 
        required 
        className={Cnpj.input} 
        onChange={handleCnpjChange} 
        value={value} 
        autoComplete="off"
      /><br />
    </div>
  );
}
