import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import btnStyle from "./adiciona_Aluno.module.css";

export default function Adicionar_Aluno() {
    const [alunos, setAlunos] = useState([]);
    const { idturma } = useParams();
    const [responseAlunosTurma, setResponseAlunoTurma] = useState(null);

    useEffect(() => {
        // Faz a requisição para obter a lista de alunos
        axios.get("http://localhost:5000/listartodosalunos")
            .then(response => {
                setAlunos(response.data); // Atualiza o estado com a lista de alunos
            })
            .catch(error => {
                console.error("Erro ao buscar alunos:", error);
            });
    }, []);

    async function colocarAluno(){
        const id_aluno = document.getElementById("alunosT").value;
        console.log(id_aluno);
        console.log(idturma);
        const responseAlunosTurma = axios.post("/api/aluno_has_turma",{
            id_aluno: id_aluno,
            id_turma: idturma
        })

        setResponseAlunoTurma(responseAlunosTurma);
    }

    if (responseAlunosTurma) {
        window.location.reload();
    }

    return (
        <div>
            <select id="alunosT" className={btnStyle.selectInput}>
                <option value="" selected disabled>Selecionar</option>
                {alunos.map(aluno => (
                    <option key={aluno.id_aluno} value={aluno.id_aluno}>
                        {aluno.nome_aluno}
                    </option>
                ))}
            </select>
            <button onClick={colocarAluno} className={btnStyle.btnAdicionaAluno}>
                Adicionar Aluno
            </button>
            <button className={btnStyle.btnTirarAluno}>
                Tirar Aluno
            </button>
        </div>
    );
}
