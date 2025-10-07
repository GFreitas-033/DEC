import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import Calendario from "./alunoCalendario.module.css";
import ContainerCss from "../../containers.module.css";

import Background_Sistema from "../../background/BackSistema";
import Barra_lateral from "../../barra-lateral/BarraLateral";
import Notifica from "../../sino-notificacao/Notificacao";
import BtnVoltar from "../../btn-voltar/BotaoVoltar"

import BotaoAdionarAlunos from "./adicionar-aluno/AdicionarAluno";

export default function AlunosCalendario() {
    const { idturma } = useParams();
    const [alunos, setAlunos] = useState([]);
    const [responseAlunosTurma, setResponseAlunoTurma] = useState(null);
    const [turma, setTurma] = useState({}); // Estado para armazenar os dados da turma
    const adm = localStorage.getItem('isAdm');
    const navigate = useNavigate()

    const alertRemoverAluno = (id_aluno) =>{
        Swal.fire({
            title: "Quer Realmente Remover esse(a) Aluno(a) dessa Turma?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Remover Aluno!",
            confirmButtonColor: "#fbd034",
            iconColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Aluno Removido com Sucesso!",
                    icon: "success",
                    confirmButtonColor: "#fbd034",
                    background: "#2b2b2b",
                    theme: "dark"
                });
                tirarAluno(id_aluno);
                setTimeout(() => {
                    window.location.reload();
                }, 1500); // 2000 milissegundos = 2 segundos
            }
        });
    }
    const alertTrocarTurma = async (id_aluno) => {
        try {
            const response = await axios.get('/api/turma/padrao-completa');
            const turmas = response.data;
    
            const inputOptions = turmas.reduce((options, turma) => {
                options[turma.id_turma] = turma.nome_turma;
                return options;
            }, {});
    
            const { value: novaTurmaId } = await Swal.fire({
                title: "Trocar o aluno de turma",
                text: "Selecione a nova turma para o aluno:",
                input: "select",
                inputOptions,
                inputPlaceholder: "Selecione uma turma",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Confirmar",
                inputValidator: (value) => {
                    if (!value) {
                        return "Você precisa selecionar uma turma.";
                    }
                },
                confirmButtonColor: "#fbd034",
                cancelButtonColor: "#d33",
                background: "#2b2b2b",
                theme: "dark"
            });
    
            if (novaTurmaId) {
                trocarTurma(id_aluno, novaTurmaId);
            }
        } catch (error) {
            console.error("Erro ao buscar turmas:", error);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível carregar as turmas.",
                icon: "error",
                confirmButtonColor: "#fbd034",
                background: "#2b2b2b",
                theme: "dark"
            });
        }
    };
    
    const trocarTurma = async (id_aluno, novaTurmaId) => {
        try {
            await axios.put(`/api/aluno_has_turma/${id_aluno}`, { id_turma: novaTurmaId });
            Swal.fire({
                title: "Sucesso!",
                text: "Aluno trocado de turma com sucesso!",
                icon: "success",
                confirmButtonColor: "#fbd034",
                background: "#2b2b2b",
                theme: "dark"
            });
            buscarAlunos(); // Atualiza a lista de alunos na turma atual
        } catch (error) {
            console.error("Erro ao trocar aluno de turma:", error);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível trocar o aluno de turma.",
                icon: "error",
                confirmButtonColor: "#fbd034",
                background: "#2b2b2b",
                theme: "dark"
            });
        }
    };
    
    const buscarAlunos = async () => {
        try {
            const response = await axios.get(`/listaralunos/${idturma}`);
            setAlunos(response.data);
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
        }
    };
    useEffect(() => {
        logado();
        buscarAlunos();
    }, [idturma]);

    useEffect(() => {
        const fetchTurma = async () => {
            try {
                const response = await axios.get(`/minhasturmas/${idturma}`);
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
                        <BotaoAdionarAlunos isAdm={adm} onAlunoAdicionado={buscarAlunos} />
                        <button className={Calendario.btnChamada} 
                            onClick={()=>{navigate(`/aulas/chamada/${idturma}`)}}>
                            Chamada
                        </button>
                        <h1 className={Calendario.textTurma}>{turma.nome_turma}</h1>
                        <p className={Calendario.textLH}>Local: {turma.endereco_completo}</p>
                        <p className={Calendario.textLH}>Horário: {turma.horario}</p>

                        <ul className={Calendario.lista}>
                            {alunos.map((aluno, index) => (
                                <li key={index}>
                                    <p className={Calendario.nomesAlunos}>{aluno.nome_pessoa}</p>
                                    <div className={Calendario.divAcoes}>
                                        <img
                                            src={require('../../../imgs/icons/switch.png')} 
                                            className={Calendario.icon}
                                            onClick={()=>{alertTrocarTurma(aluno.id_pessoa)}}
                                            alt="Trocar de Turma"
                                        />
                                        <img
                                            src={require('../../../imgs/icons/Excluir.png')} 
                                            className={Calendario.icon}
                                            onClick={()=>{alertRemoverAluno(aluno.id_pessoa)}}
                                            alt="Excluir aluno"
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    );
}
