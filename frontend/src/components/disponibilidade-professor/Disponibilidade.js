import React, { useState, useEffect } from "react";
import axios from "axios";
import Timetable from 'react-timetable-events';

import ContainerCss from "../containers.module.css";
import EstiloDispo from "./disponibilidade.module.css";
import "./globalDisponibilidade.css";

import BackgroundSistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

// Objeto inicial vazio para o calendário, para podermos reutilizá-lo
const initialEventsState = {
    monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [],
};

export default function Disponibilidade_Prof() {
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
                // ***** INÍCIO DA ALTERAÇÃO *****
                
                // Processa o horário de início (horario)
                const [startHour, startMinute] = turma.horario.split(':').map(Number);
                const startTime = new Date();
                startTime.setHours(startHour, startMinute, 0, 0);

                // Processa o horário final (horario_final)
                const [endHour, endMinute] = turma.horario_final.split(':').map(Number);
                const endTime = new Date();
                endTime.setHours(endHour, endMinute, 0, 0);

                // Adiciona o evento ao calendário com o startTime e endTime corretos
                newSchedule[dayKey].push({
                    id: turma.id_turma,
                    name: turma.nome_unidade, // ou turma.nome_completo_turma se a API retornar assim
                    type: "custom",
                    startTime: startTime,
                    endTime: endTime, // Agora utiliza o horário final da API
                });
                
                // ***** FIM DA ALTERAÇÃO *****
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

        if (selectedProfessorId) {
            fetchProfessorSchedule();
        } else {
            setEvents(initialEventsState);
        }
    }, [selectedProfessorId]);
    
    const handleProfessorChange = (e) => {
        const newProfessorId = e.target.value;
        setEvents(initialEventsState); 
        setSelectedProfessorId(newProfessorId);
    };

    return (
        <div>
            <BackgroundSistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloDispo.container_Dispo}>
                    <div className={EstiloDispo.divInput}>
                        <select 
                            id="SelecaoProfessor" 
                            className={EstiloDispo.inputSelect}
                            value={selectedProfessorId} 
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