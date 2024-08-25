import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Barra_lateral from "../../barra_lateral/icons_barra_lateral";
import Calendario from "./alunoCalendario.module.css";
import ContainerCss from "../../containers.module.css";
import BotaoAdionarAlunos from "./botaoAdicionarAluno/adicionarAluno";
import Notifica from "../../sino_notificacao/notificacao"

export default function AlunosCalendario() {
    const { idturma } = useParams();
    const [alunos, setAlunos] = useState([]);
    const [turma, setTurma] = useState({}); // Estado para armazenar os dados da turma
    const adm = localStorage.getItem('isAdm');
    const navigate = useNavigate()

    useEffect(() => {
        logado();
        const fetchAlunos = async () => {
            try {
                const response = await axios.get(`/listaralunos/${idturma}`);
                setAlunos(response.data);
            } catch (error) {
                console.error("Erro ao buscar alunos:", error);
            }
        };

        fetchAlunos();
    }, [idturma]);

    useEffect(() => {
        const fetchTurma = async () => {
            try {
                const response = await axios.put(`/minhasturmas/${idturma}`);
                setTurma(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados da turma:", error);
            }
        };

        fetchTurma();
    }, [idturma]);

    const logado = async () => {
        try {
            let response = await axios.post('/login');
        } catch (error) {
            navigate('/');
        }
    };

    return (
        <div className={ContainerCss.container}>
            <Barra_lateral />
            <div className={Calendario.ajuste}>
                <div className={Calendario.container_alunoscalendario}>
                    <BotaoAdionarAlunos isAdm={adm}/>
                    <h1 className={Calendario.textTurma}>{turma.nome_turma}</h1>
                    <p className={Calendario.textLH}>Local: {turma.endereco_completo}</p>
                    <p className={Calendario.textLH}>Horário: {turma.horario}</p>
                    <ul className={Calendario.lista}>
                        {alunos.map((aluno, index) => (
                            <li key={index}>{aluno}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <Notifica />
        </div>
    );
}
