import React from "react";
import UnidadeStyle from "../input.module.css";

export default function Unidade_input({ value, setValue, unidades }) {
  function salvar(e) {
    let valor = e.target.value;
    setValue(valor);
  }

  return (
    <div className={UnidadeStyle.esquerda}>
      <label className={UnidadeStyle.label}>
        <b>Unidade</b>
      </label>
      <br />
      <select
        id="SelecaoUnidade"
        className={`${UnidadeStyle.inputPU} ${UnidadeStyle.inputPersonalizado}`}
        value={value}
        onChange={salvar}
      >
        <option value="" disabled>
          Selecionar
        </option>
        {unidades.map((unidade) => (
          <option key={unidade.id} value={unidade.id}>
            {unidade.nome}
          </option>
        ))}
      </select>
      <br />
    </div>
  );
}