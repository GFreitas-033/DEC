import React, { useEffect, useState } from "react";
import UnidadeStyle from "../input.module.css";
import axios from "axios";

export default function Unidade_input() {
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const response = await axios.get('/api/unidade/');
        const unidadesData = response.data.map(unidade => ({
          id: unidade.id_unidade,
          nome: unidade.nome_unidade
        }));
        setUnidades(unidadesData);
      } catch (error) {
        console.error('Erro ao buscar unidades:', error);
      }
    };

    fetchUnidades();
  }, []);

  return (
    <div className={UnidadeStyle.esquerda}>
      <label className={UnidadeStyle.label}><b>Unidade</b></label><br />
      <select id="SelecaoUnidade" className={UnidadeStyle.inputsSelect}>
        <option value="" selected disabled>Selecionar</option>
        {unidades.map(unidade => (
          <option key={unidade.id} value={unidade.id}>{unidade.nome}</option>
        ))}
      </select><br />
    </div>
  );
}
