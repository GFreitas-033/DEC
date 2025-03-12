import React, { useState } from "react";
import filtroStyle from "./filtro.module.css";

export default function Filtro({ onFilterChange }) {
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [mostrar, setMostrar] = useState(false);

  const FiltroAulaClick = () => {
    setMostrar((prevMostrar) => !prevMostrar);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setDiasSelecionados((prevDias) => {
      const novosDias = checked
        ? [...prevDias, value]
        : prevDias.filter((dia) => dia !== value);
      onFilterChange(novosDias);
      return novosDias;
    });
  };

  return (
    <div className={filtroStyle.containerFiltro}>
      <h2 onClick={FiltroAulaClick}>Filtrar</h2>
      <div className={`${filtroStyle.caixa} ${mostrar ? filtroStyle.mostrar : ""}`}>
        {["segunda", "terça", "quarta", "quinta", "sexta", "sábado"].map((dia) => (
          <div key={dia}>
            <input
              type="checkbox"
              id={dia}
              name="dias"
              value={dia}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={dia}>
              {dia.charAt(0).toUpperCase() + dia.slice(1)}{dia === "sábado" ? "" : "-feira"}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
