import React, { useState } from "react";
import filtroStyle from "./filtro.module.css";

export default function FiltroDiaSemana({ onFilterChange }) {
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [mostrar, setMostrar] = useState(false);

  const [checado1, setChecado1] = useState(false);
  const [filtroTurmaNome, setFiltroTurmaNome] = useState("");

  const FiltroAulaClick = () => {
    setMostrar((prevMostrar) => !prevMostrar);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setDiasSelecionados((prevDias) => {
      const novosDias = checked
        ? [...prevDias, value]
        : prevDias.filter((dia) => dia !== value);
      // ao alterar dias
      onFilterChange({ dias: novosDias, nome: filtroTurmaNome });
      return novosDias;
    });
  };

  
  const handleNomeChange = (e) => {
    const novoNome = e.target.value;
    setFiltroTurmaNome(novoNome);

    // ao alterar nome
    onFilterChange({ dias: diasSelecionados, nome: novoNome });
  };

  const toggleNome = () => {
    setChecado1((prev) => {
      const novoEstado = !prev;
      if (novoEstado === false) {
        // Se está fechando, limpa o valor do filtro
        setFiltroTurmaNome("");
        // Também atualiza o filtro para remover o nome
        onFilterChange({ dias: diasSelecionados, nome: "" });
      }
      return novoEstado;
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
        <div>
            <input type="checkbox" checked={checado1} onChange={toggleNome} />
            <label>Nome</label>
            {checado1 && (
                <>
                    <br />
                    <input type="text" placeholder="Nome da Turma" 
                    className={`${filtroStyle.inputGeral} ${filtroStyle.inputTexto}`} 
                    onChange={handleNomeChange}
                    value={filtroTurmaNome} />
                </>
            )}
        </div>
      </div>
    </div>
  );
}
