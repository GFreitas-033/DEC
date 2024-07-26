import React, { useEffect, useState } from "react";
import Calendario from "./calendario.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ContentCalendario() {
    const [calendarioData, setCalendarioData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loadingText, setLoadingText] = useState("Carregando.");
    useEffect(() => {
        const timer = setTimeout(() => {
            if (dataLoaded) {
                setLoading(false);
            }
        }, 1200);

        return () => clearTimeout(timer);
    }, [dataLoaded]);

    useEffect(() => {
        const loadingTexts = ['Carregando.', 'Carregando..', 'Carregando...'];
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % loadingTexts.length;
            setLoadingText(loadingTexts[currentIndex]);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        axios.get("/minhasTurmas")
            .then(response => {
                setCalendarioData(response.data);
                setDataLoaded(true);
            })
            .catch(error => {
                console.error("Erro ao buscar dados do calendário:", error);
            });
    }, []);

    const getTurmaNome = (horario) => {
        const [hours] = horario.split(":");
        const hour = parseInt(hours, 10);
        if (hour >= 6 && hour < 12) {
            return "Turma Manhã";
        } else if (hour >= 12 && hour < 18) {
            return "Turma Tarde";
        } else {
            return "Turma Noite";
        }
    };

    const formatHorario = (horario) => {
        const [hours, minutes] = horario.split(":");
        return `${hours}:${minutes}`;
    };

    const formatDiaSemana = (dia) => {
        const formattedDia = dia.charAt(0).toUpperCase() + dia.slice(1);
        return dia === "sabado" || dia === "domingo" ? formattedDia : `${formattedDia}-Feira`;
    };

    const groupByDiaSemana = (data) => {
        return data.reduce((acc, item) => {
            const dia = item.dia_semana;
            if (!acc[dia]) {
                acc[dia] = [];
            }
            acc[dia].push(item);
            return acc;
        }, {});
    };

    const groupedData = groupByDiaSemana(calendarioData);

    return (
        <div className={Calendario.margin_content}>
            {loading ? (
                <div className={Calendario.div_helloworld}><h1 className={Calendario.helloworld}>{loadingText}</h1></div>
            ) : (
                Object.keys(groupedData).map((dia, index) => (
                    <div key={index}>
                        <h1 className={Calendario.textDia}>
                            <u>{formatDiaSemana(dia)}</u>
                        </h1>
                        {groupedData[dia].map((item, subIndex) => (
                            <Link to={`alunos_aulas/${item.id_turma}`}>
                                <div key={subIndex} className={Calendario.container_calendario}>
                                <h1 className={Calendario.textTurma}>{getTurmaNome(item.horario)}</h1>
                                <p className={Calendario.textLH}>Local: {item.endereco_completo}</p>
                                <p className={Calendario.textLH}>Horário: {formatHorario(item.horario)}</p>
                            </div>
                            </Link>
                            
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}
