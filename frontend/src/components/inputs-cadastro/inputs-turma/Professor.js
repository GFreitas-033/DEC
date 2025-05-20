// components/Professor_input.js
import React from "react";
import ProfessorStyle from "../input.module.css";

export default function Professor_input({ value, setValue, professores }) {
  function salvar(e) {
    let valor = e.target.value;
    setValue(valor);
  }

  return (
    <div className={ProfessorStyle.esquerda}>
      <label className={ProfessorStyle.label}>
        <b>Professor</b>
      </label>
      <br />
      <select
        id="SelecaoProfessor"
        className={`${ProfessorStyle.inputPU} ${ProfessorStyle.inputPersonalizado}`}
        value={value}
        onChange={salvar}
      >
        <option value="" disabled>
          Selecionar
        </option>
        {professores.map((professor) => (
          <option key={professor.id} value={professor.id}>
            {professor.nome}
          </option>
        ))}
      </select>
      <br />
    </div>
  );
}
