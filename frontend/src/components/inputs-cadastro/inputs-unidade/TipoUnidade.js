import React from "react";
import tipoUnidade from "../input.module.css"

export default function TipoUnidade_input({ value, setValue }) {
  function salvar(e) {
    let valor = e.target.value;
    setValue(valor);
  }

  return (
    <div className={tipoUnidade.esquerda}>
      <label className={tipoUnidade.label}><b>Tipo da Unidade</b></label><br />
      <select id="tipoUnidade" className={`${tipoUnidade.input} ${tipoUnidade.input13}`} 
      value={value} onChange={salvar}>
          <option value="" disabled>Selecionar</option>
          <option value="dec">DEC</option>
          <option value="publica">E. Pública</option>
          <option value="particular">E. Particular</option>
      </select>
    </div>
  );
}
