import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Calendario from "./alunoCalendario.module.css";
import ContainerCss from "../../containers.module.css";

import Background_Sistema from "../../background/backSistema/backSistema";
import Barra_lateral from "../../barra_lateral/icons_barra_lateral";
import BotaoAdionarAlunos from "./botaoAdicionarAluno/adicionarAluno";
import Notifica from "../../sino_notificacao/notificacao";

export default function AlunosCalendario() {
    const { idturma } = useParams();
    const [alunos, setAlunos] = useState([]);
    const [responseAlunosTurma, setResponseAlunoTurma] = useState(null);
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

    async function tirarAluno(id_aluno) {
        try {
            const response = await axios.delete(`/api/aluno_has_turma/aluno/${id_aluno}`);
            setResponseAlunoTurma(response);
            setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno.id_aluno !== id_aluno));
            window.location.reload();
        } catch (error) {
            console.error("Erro ao remover aluno:", error);
        }
    }

    return (
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <Barra_lateral />
                <div className={Calendario.ajuste}>
                    <div className={Calendario.container_alunoscalendario}>
                        <BotaoAdionarAlunos isAdm={adm}/>
                        <button className={Calendario.btnChamada} 
                            onClick={()=>{navigate('/aulas/chamada')}}>
                            Chamada
                        </button>
                        <h1 className={Calendario.textTurma}>{turma.nome_turma}</h1>
                        <p className={Calendario.textLH}>Local: {turma.endereco_completo}</p>
                        <p className={Calendario.textLH}>Horário: {turma.horario}</p>
                        <ul className={Calendario.lista}>
                            {alunos.map((aluno, index) => (
                                <li key={index}>
                                    {aluno.nome_pessoa}
                                    <img 
                                        src={require('../../../imgs/icons/Excluir.png')} 
                                        className={Calendario.iconExcluir}
                                        onClick={() => {tirarAluno(aluno.id_pessoa)}}
                                        alt="Excluir aluno"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Notifica />
            </div>
        </div>
    );
}
