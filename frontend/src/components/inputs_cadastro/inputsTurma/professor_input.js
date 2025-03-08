import React, { useEffect, useState } from "react";
import ProfessorStyle from "../input.module.css";
import axios from "axios";

export default function Professor_input() {
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        // Primeira requisição para obter os IDs dos professores
        const responseProfessores = await axios.get('/api/professor/');
        const ids = responseProfessores.data.map(prof => prof.id_pessoa);

        // Segunda requisição para obter os nomes das pessoas com os IDs obtidos
        const responsePessoas = await axios.get('/api/pessoa/');
        const nomes = responsePessoas.data
          .filter(pessoa => ids.includes(pessoa.id_pessoa))
          .map(pessoa => ({ id: pessoa.id_pessoa, nome: pessoa.nome_pessoa }));

        setProfessores(nomes);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };

    fetchProfessores();
  }, []);

  return (
    <div className={ProfessorStyle.esquerda}>
      <label className={ProfessorStyle.label}>
        <b>Professor</b>
      </label><br />
      <select id="SelecaoProfessor" className={`${ProfessorStyle.inputPU} 
        ${ProfessorStyle.inputPersonalizado}`}>
        <option value="" selected disabled>Selecionar</option>
          {professores.map(professor => (
            <option key={professor.id} value={professor.id}>
              {professor.nome}
            </option>
          ))}
      </select><br />
    </div>
  );
}
