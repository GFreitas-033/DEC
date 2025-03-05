import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import btnStyle from "./adiciona_Aluno.module.css";

export default function Adicionar_Aluno({ isAdm }) {
    const [alunos, setAlunos] = useState([]);
    const { idturma } = useParams();

    const [filtrarAluno, setFiltrarAluno] = useState([]);
    const [achar, setAchar] = useState("");
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [mostrarLista, setMostrarLista] = useState(false);

    useEffect(() => {
        axios.get("/listartodosalunos")
        .then(response => {
            setAlunos(response.data);
            setFiltrarAluno(response.data);
        })
        .catch(error => {
            console.error("Erro ao buscar alunos:", error);
        });
    }, []);

    useEffect(() => {
        const filtro = alunos.filter(aluno =>
            aluno.nome_aluno.toLowerCase().includes(achar.toLowerCase())
        );
        setFiltrarAluno(filtro);
    }, [achar, alunos]);

    async function colocarAluno() {
        if (!alunoSelecionado) {
            alert("Selecione um aluno para adicionar!");
            return;
        }

        try {
            await axios.post("/api/aluno_has_turma", {
                id_aluno: alunoSelecionado,
                id_turma: idturma
            });
            alert("Aluno adicionado com sucesso!");
            window.location.reload();
        }catch(error){
            console.error("Erro ao adicionar aluno:", error);
        }
    }

    if (isAdm !== "true") return null;

    return (
        <div className={btnStyle.containerBotoes}>
            <div className={btnStyle.divFiltro}>
                <input type="text" placeholder="Pesquisar Aluno"
                    value={achar}
                    onChange={(e) => {
                        setAchar(e.target.value);
                        setMostrarLista(true);
                    }}
                    onClick={()=>{
                        if(mostrarLista){
                            setMostrarLista(false);
                        }else{
                            setMostrarLista(true);
                        }
                    }}
                    className={`${btnStyle.selectInput} ${btnStyle.stylePadrao}`}
                />
                {mostrarLista && (
                    <ul className={btnStyle.listaAlunos}>
                        {filtrarAluno.length > 0 ? (
                            filtrarAluno.map(aluno => (
                            <li
                            key={aluno.id_aluno}
                            onClick={() => {
                                setAlunoSelecionado(aluno.id_aluno);
                                setAchar(aluno.nome_aluno);
                                setMostrarLista(false);
                            }}
                            className={btnStyle.listaItem}
                            >
                                {aluno.nome_aluno}
                            </li>
                        ))
                        ) : (
                            <li className={btnStyle.listaItem}>Nenhum aluno encontrado</li>
                        )}
                    </ul>
                )}
            </div>
            <button onClick={colocarAluno} className={`${btnStyle.btnAdicionaAluno}  ${btnStyle.stylePadrao}`}>
                Adicionar Aluno
            </button>
        </div>
    );
}