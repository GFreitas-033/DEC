import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import ContainerCss from "../containers.module.css";
import EstiloCalendario from "./calendario.module.css";
import Filtro from "./filtroDiaSemana/filtro";
import BarraLateral from "../barra_lateral/icons_barra_lateral";
import Notifica from "../sino_notificacao/notificacao";

export default function Calendario(){
    const navigate = useNavigate();
    const [calendarioData, setCalendarioData] = useState([]);
    const [diasSelecionados, setDiasSelecionados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loadingText, setLoadingText] = useState("Carregando.");

    useEffect(() => {
        logado();
    });

    const logado = async () => {
        try {
            let response = await axios.post('/login');
        } catch (error) {
            navigate('/');
        }
    };
    
    useEffect(() => {
        axios
        .get("/minhasturmas")
        .then((response) => {
            setCalendarioData(response.data);
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

    const groupedData = groupByDiaSemana(filteredData);

    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <div className={EstiloCalendario.margin_content}>
              <Filtro onFilterChange={setDiasSelecionados} />
              {loading ? (
                <div className={EstiloCalendario.div_helloworld}>
                  <h1 className={EstiloCalendario.helloworld}>{loadingText}</h1>
                </div>
              ) : (
                Object.keys(groupedData).map((dia, index) => (
                  <div key={index} className={EstiloCalendario.marginTop}>
                    <h1 className={EstiloCalendario.textDia}>
                      <u>{formatDiaSemana(dia)}</u>
                    </h1>
                    {groupedData[dia].map((item, subIndex) => (
                      <Link to={`alunos_aulas/${item.id_turma}`} key={subIndex}>
                        <div className={EstiloCalendario.container_calendario}>
                          <h1 className={EstiloCalendario.textTurma}>{item.nome_turma}</h1>
                          <p className={EstiloCalendario.textLH}>Local: {item.endereco_completo}</p>
                          <p className={EstiloCalendario.textLH}>Horário: {formatHorario(item.horario)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))
              )}
            </div>
            <Notifica />
        </div>
    )
}