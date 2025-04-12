import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import Calendario from "./alunoCalendario.module.css";
import ContainerCss from "../../containers.module.css";

import Background_Sistema from "../../background/backSistema/backSistema";
import Barra_lateral from "../../barra_lateral/icons_barra_lateral";
import BotaoAdionarAlunos from "./botaoAdicionarAluno/adicionarAluno";
import Notifica from "../../sino_notificacao/notificacao";
import BtnVoltar from "../../btnVoltar/btnVoltar"

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
    const alertTrocarTurma = async () => {
        const { value: novaTurma } = await Swal.fire({
            title: "Trocar o aluno de turma",
            text: "Selecione a nova turma para o aluno:",
            input: "select",
            inputOptions: {
                "manha": "Turma da Manhã",
                "tarde": "Turma da Tarde",
                "noite": "Turma da Noite"
            },
            inputPlaceholder: "Selecione uma turma",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value) {
                        resolve(); // tudo certo
                    } else {
                        resolve("Você precisa selecionar uma turma.");
                    }
                });
            },
            confirmButtonColor: "#fbd034",
            cancelButtonColor: "#d33",
            background: "#2b2b2b",
            theme: "dark"
        });
      
        if (novaTurma) {
            // Aqui você pode fazer o que quiser com a nova turma selecionada
            Swal.fire({
                title: `Aluno transferido para a ${novaTurma}`,
                confirmButtonColor: "#fbd034",
                cancelButtonColor: "#d33",
                background: "#2b2b2b",
                theme: "dark"
            });
        }
    };
    

    // useEffect(() => {
    //     logado();
    //     const fetchAlunos = async () => {
    //         try {
    //             const response = await axios.get(`/listaralunos/${idturma}`);
    //             setAlunos(response.data);
    //         } catch (error) {
    //             console.error("Erro ao buscar alunos:", error);
    //         }
    //     };

    //     fetchAlunos();
    // }, [idturma]);
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
                                    {aluno.nome_pessoa}
                                    <div className={Calendario.divAcoes}>
                                        <img 
                                            src={require('../../../imgs/icons/switch.png')} 
                                            className={Calendario.iconExcluir}
                                            onClick={()=>{alertTrocarTurma(aluno.id_pessoa)}}
                                            alt="Trocar de Turma"
                                        />
                                        <img 
                                            src={require('../../../imgs/icons/Excluir.png')} 
                                            className={Calendario.iconExcluir}
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
