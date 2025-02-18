import React, { useState } from "react"
import filtroStyle from "./filtro.module.css"

export default function Filtro() {
  const [mostrar, setMostrar] = useState(false);


  const FiltroAulaClick = () => {
    setMostrar(prevMostrar => !prevMostrar);
  };

  return (
    <div className={filtroStyle.containerFiltro}>
        <h2 onClick={FiltroAulaClick}>Filtrar</h2>

        <div className={`${filtroStyle.caixa} ${mostrar ? filtroStyle.mostrar : ''}`}>
            <div>
                <input type="checkbox" id="segunda" name="dias" value="segunda" />
                <label htmlFor="segunda">Segunda-feira</label>
            </div>
            <div>
                <input type="checkbox" id="terca" name="dias" value="terca" />
                <label htmlFor="terca">Terça-feira</label>
            </div>
            <div>
                <input type="checkbox" id="quarta" name="dias" value="quarta" />
                <label htmlFor="quarta">Quarta-feira</label>
            </div>
            <div>
                <input type="checkbox" id="quinta" name="dias" value="quinta" />
                <label htmlFor="quinta">Quinta-feira</label>
            </div>
            <div>
                <input type="checkbox" id="sexta" name="dias" value="sexta" />
                <label htmlFor="sexta">Sexta-feira</label>
            </div>
            <div>
                <input type="checkbox" id="sabado" name="dias" value="sabado" />
                <label htmlFor="sabado">Sábado</label>
            </div>
        </div>
    </div>
  )
}