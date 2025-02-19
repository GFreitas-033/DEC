import React, { useEffect, useState } from "react";
import Calendario from "./calendario.module.css";
import Filtro from "./filtroDiaSemana/filtro";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ContentCalendario() {
    const [calendarioData, setCalendarioData] = useState([]);
    const [diasSelecionados, setDiasSelecionados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loadingText, setLoadingText] = useState("Carregando.");

    useEffect(() => {
        axios
            .get("/minhasTurmas")
            .then((response) => {
                const data = Array.isArray(response.data) ? response.data : [];
                setCalendarioData(data);
                setDataLoaded(true);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados do calendário:", error);
                setDataLoaded(true);
                setLoading(false);
            });
    }, []);

    const formatHorario = (horario) => {
        const [hours, minutes] = horario.split(":");
        return `${hours}:${minutes}`;
    };

    const getCurrentWeekday = () => {
        const days = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sabado"];
        const today = new Date().getDay();
        return days[today];
    };

    const formatDiaSemana = (dia) => {
        const currentWeekday = getCurrentWeekday();
        if (dia === currentWeekday) {
            return "Hoje";
        }
        const formattedDia = dia.charAt(0).toUpperCase() + dia.slice(1);
        return dia === "sábado" || dia === "domingo" ? formattedDia : `${formattedDia}-Feira`;
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

    const filteredData = diasSelecionados.length > 0
        ? calendarioData.filter((item) => diasSelecionados.includes(item.dia_semana))
        : calendarioData;

    const groupedData = Array.isArray(filteredData) ? groupByDiaSemana(filteredData) : {};

    return (
        <div className={Calendario.margin_content}>
            <Filtro onFilterChange={setDiasSelecionados} />
            {loading ? (
                <div className={Calendario.div_helloworld}>
                    <h1 className={Calendario.helloworld}>{loadingText}</h1>
                </div>
            ) : (
                Object.keys(groupedData).map((dia, index) => (
                    <div key={index} className={Calendario.marginTop}>
                        <h1 className={Calendario.textDia}>
                            <u>{formatDiaSemana(dia)}</u>
                        </h1>
                        {groupedData[dia].map((item, subIndex) => (
                            <Link to={`alunos_aulas/${item.id_turma}`} key={subIndex}>
                                <div className={Calendario.container_calendario}>
                                    <h1 className={Calendario.textTurma}>{item.nome_turma}</h1>
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