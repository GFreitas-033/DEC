// Dashboard.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import ContainerCss from "../containers.module.css";
import EstiloDashboard from "./dashboard.module.css";

import BackgroundSistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

import Geral from "./geral/AnaliseGeral";
import Graficos from "./graficos/Graficos";
import AnoNasc from "./ano-nasc/AnoNascimento";
import CidadeUnidade from "./cidade-unidade/CidadeUnidade";
import Comparativo from "./comparativo/Comparativo";
import AlunosCidade from "./alunos-cidade/AlunosCidade";

// Indicador de carregamento inicial (tela cheia)
const InitialLoadingSpinner = () => (
    <div className={EstiloDashboard.spinnerContainer}>
        <p>Carregando dados...</p>
    </div>
);

// Indicador de carregamento para filtros (sobreposição)
const LoadingOverlay = () => (
    <div className={EstiloDashboard.loadingOverlay}>
        <p>Atualizando...</p>
    </div>
);


export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [filters, setFilters] = useState({
        cidade: "Todas as Cidades",
        unidade: "",
    });
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/dashboard", {
                params: filters,
            });
            setDashboardData(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados do dashboard:", error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // Renderiza o spinner de tela cheia apenas no carregamento inicial
    if (!dashboardData) {
        return (
            <div>
                <BackgroundSistema />
                <div className={ContainerCss.container}>
                    <BarraLateral />
                    <div className={EstiloDashboard.ajusteTela}>
                        <InitialLoadingSpinner />
                    </div>
                    <Notifica />
                    <BtnVoltar />
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <BackgroundSistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloDashboard.ajusteTela}>
                    {/* O container do dash agora tem position relative para o overlay funcionar */}
                    <div className={EstiloDashboard.containerDash}>
                        {/* O overlay só aparece durante as atualizações, não no carregamento inicial */}
                        {loading && <LoadingOverlay />}

                        <Geral data={dashboardData.geral} />
                        <Graficos data={dashboardData.graficos} />
                        <AnoNasc data={dashboardData.anoNascimento.data} />
                        <hr className={EstiloDashboard.hrContainer} />
                        <CidadeUnidade
                            data={dashboardData.cidadeUnidade}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                        <Comparativo filters={filters} />
                        <AlunosCidade data={dashboardData.alunosPorCidade} />
                    </div>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    );
}