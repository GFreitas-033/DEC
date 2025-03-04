import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import btnStyle from "./adiciona_Aluno.module.css";

export default function Adicionar_Aluno(isAdm) {
    const [alunos, setAlunos] = useState([]);
    const { idturma } = useParams();
    const [responseAlunosTurma, setResponseAlunoTurma] = useState(null);

    const [filteredAlunos, setFilteredAlunos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAluno, setSelectedAluno] = useState("");

    useEffect(() => {
        axios.get("/listartodosalunos")
            .then(response => {
                setAlunos(response.data); // Atualiza o estado com a lista de alunos
                setFilteredAlunos(response.data); // Inicialmente, todos os alunos são filtrados
            })
            .catch(error => {
                console.error("Erro ao buscar alunos:", error);
            });
    }, []);

    useEffect(() => {
        // Filtra os alunos com base no termo de busca
        const filtered = alunos.filter(aluno =>
            aluno.nome_aluno.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAlunos(filtered);
    }, [searchTerm, alunos]);

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

    // async function tirarAluno(){
    //     const id_aluno = document.getElementById("alunosT").value;
    //     console.log(id_aluno);
    //     const responseAlunosTurma = axios.delete(`/api/aluno_has_turma/aluno/${id_aluno}`);

    //     setResponseAlunoTurma(responseAlunosTurma);
    // }

    if (responseAlunosTurma) {
        alert("Sucesso!!!");
        window.location.reload();
    }

    const handleSelectChange = (alunoId) => {
        setSelectedAluno(alunoId); // Atualiza o aluno selecionado
        setSearchTerm(""); // Limpa o campo de pesquisa ao selecionar uma opção
    };
    if(isAdm.isAdm === "true"){
        return (
            <div>
                <input
                    type="text"
                    placeholder="Pesquisar Aluno"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={btnStyle.selectInput}
                />
                <select id="alunosT" className={btnStyle.selectInput}>
                    <option value="" selected disabled>Selecionar</option>
                    {filteredAlunos.map(aluno => (
                        <option key={aluno.id_aluno} value={aluno.id_aluno}>
                            {aluno.nome_aluno}
                        </option>
                    ))}
                </select>
                <button onClick={colocarAluno} className={btnStyle.btnAdicionaAluno}>
                    Adicionar Aluno
                </button>
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }
}
