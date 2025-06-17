import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Timetable from 'react-timetable-events';

import ContainerCss from "../containers.module.css";
import EstiloDispo from "./disponibilidade.module.css";
import "./globalDisponibilidade.css";

import Background_Sistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

// Objeto inicial vazio para o calendário, para podermos reutilizá-lo
const initialEventsState = {
    monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [],
};

export default function Disponibilidade_Prof() {
    const navigate = useNavigate();
    const [selectedProfessorId, setSelectedProfessorId] = useState("");
    const [professores, setProfessores] = useState([]);
    const [events, setEvents] = useState(initialEventsState);
    const [isLoading, setIsLoading] = useState(false);

    const formatEventsForTimetable = (turmas) => {
        // Criamos uma nova cópia para garantir a imutabilidade
        const newSchedule = JSON.parse(JSON.stringify(initialEventsState));
        
        const dayMap = {
            'segunda': 'monday', 'terça': 'tuesday', 'quarta': 'wednesday',
            'quinta': 'thursday', 'sexta': 'friday', 'sábado': 'saturday'
        };

        if (!turmas || turmas.length === 0) {
            return newSchedule;
        }

        turmas.forEach(turma => {
            const dayKey = dayMap[turma.dia_semana.toLowerCase()];
            if (dayKey) {
                const [hour, minute] = turma.horario.split(':').map(Number);
                
                const startTime = new Date();
                startTime.setHours(hour, minute, 0, 0);

                const endTime = new Date(startTime.getTime());
                endTime.setHours(startTime.getHours() + 1); // Assumindo duração de 1 hora

                newSchedule[dayKey].push({
                    id: turma.id_turma,
                    name: turma.nome_unidade,
                    type: "custom",
                    startTime: startTime,
                    endTime: endTime,
                });
            }
        });
        return newSchedule;
    };

    useEffect(() => {
        const fetchProfessores = async () => {
            try {
                const response = await axios.get("/api/professor/");
                const nomes = response.data.map((prof) => ({
                    id: prof.id_pessoa,
                    nome: prof.nome_pessoa,
                }));
                setProfessores(nomes);
            } catch (error) {
                console.error("Erro ao buscar professores:", error);
            }
        };
        fetchProfessores();
    }, []);

    useEffect(() => {
        const fetchProfessorSchedule = async () => {
            if (!selectedProfessorId) {
                setEvents(initialEventsState);
                return;
            }
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/professor/${selectedProfessorId}/turmas`);
                const formattedEvents = formatEventsForTimetable(response.data);
                setEvents(formattedEvents);
            } catch (error) {
                console.error("Erro ao buscar a disponibilidade do professor:", error);
                setEvents(initialEventsState);
            } finally {
                setIsLoading(false);
            }
        };

        // Não executa a busca se o ID for nulo, apenas limpa
        if (selectedProfessorId) {
            fetchProfessorSchedule();
        } else {
            setEvents(initialEventsState);
        }
    }, [selectedProfessorId]);

    // ***** INÍCIO DA ALTERAÇÃO *****
    // Nova função para lidar com a mudança de professor
    const handleProfessorChange = (e) => {
        const newProfessorId = e.target.value;
        
        // 1. Limpa o calendário imediatamente para remover os dados antigos
        setEvents(initialEventsState); 
        
        // 2. Define o ID do novo professor, o que irá disparar o useEffect para buscar os novos dados
        setSelectedProfessorId(newProfessorId);
    };
    // ***** FIM DA ALTERAÇÃO *****

    return (
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloDispo.container_Dispo}>
                    <div className={EstiloDispo.divInput}>
                        <select 
                            id="SelecaoProfessor" 
                            className={EstiloDispo.inputSelect}
                            value={selectedProfessorId} 
                            // O onChange agora chama a nova função
                            onChange={handleProfessorChange}
                        >
                            <option value="" disabled>
                                Selecione um Professor
                            </option>
                            {professores.map((professor) => (
                                <option key={professor.id} value={professor.id}>
                                    {professor.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={EstiloDispo.divCalendario}>
                        {isLoading ? (
                            <p style={{ textAlign: 'center', marginTop: '2rem' }}>Carregando disponibilidade...</p>
                        ) : (
                            <Timetable
                                events={events}
                                hoursInterval={{ from: 8, to: 22 }}
                                timeLabel="Horários"
                                days={[
                                    { day: 'monday', label: 'Segunda' },
                                    { day: 'tuesday', label: 'Terça' },
                                    { day: 'wednesday', label: 'Quarta' },
                                    { day: 'thursday', label: 'Quinta' },
                                    { day: 'friday', label: 'Sexta' },
                                    { day: 'saturday', label: 'Sábado' },
                                ]}
                                style={{ height: "100%" }}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Notifica />
            <BtnVoltar />
        </div>
    );
}