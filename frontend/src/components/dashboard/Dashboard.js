import React from "react";

import ContainerCss from "../containers.module.css";
import EstiloDashboard from "./dashboard.module.css";

import Background_Sistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

// Import dos Blocos do Dashboard
import Geral from "./geral/AnaliseGeral"
import Graficos from "./graficos/Graficos"
import AnoNasc from "./ano-nasc/AnoNascimento"
import CidadeUnidade from "./cidade-unidade/CidadeUnidade"
import Comparativo from "./comparativo/Comparativo"
import AlunosCidade from "./alunos-cidade/AlunosCidade"

export default function Dashboard() {
    // Centralizando todos os dados do dashboard em um único objeto
    const dashboardData = {
        geral: {
            totalAlunos: 5000,
            ativos: 2500,
            inativos: 2500,
            pagantes: 2500,
            naoPagantes: 2500
        },
        graficos: {
            genero: {
                data: [
                    { name: "Meninos", value: 2500 },
                    { name: "Meninas", value: 2500 },
                ],
                cores: ["#4867FF", "#FF4AE7"]
            },
            destroCanhoto: {
                data: [
                    { name: "Destro", value: 4500 },
                    { name: "Canhoto", value: 500 },
                ],
                cores: ["#42FF42", "#FF4545"]
            }
        },
        anoNascimento: {
            data: [
                { ano: "2008", quantidade: 120 },
                { ano: "2009", quantidade: 95 },
                { ano: "2010", quantidade: 80 },
                { ano: "2011", quantidade: 85 },
                { ano: "2012", quantidade: 40 },
            ]
        },
        cidadeUnidade: {
            cidades: ["Todas as Cidades", "Lins", "Bauru", "Rio Preto", "Promissão", "Guaiçara", "Cafelândia"],
            unidades: ["Lins", "Bauru", "Rio Preto", "Promissão", "Guaiçara", "Cafelândia"]
        },
        comparativo: {
            alunosData1: 4350,
            alunosData2: 5120
        },
        alunosPorCidade: {
            data: [
                { cidade: 'Lins', alunos: 1600 },
                { cidade: 'Bauru', alunos: 900 },
                { cidade: 'Rio Preto', alunos: 750 },
                { cidade: 'Promissão', alunos: 700 },
                { cidade: 'Guaíçara', alunos: 550 },
                { cidade: 'Cafelândia', alunos: 500 },
            ],
            cores: ['#FBD034', '#34A0F2', '#F27457', '#8AD1C2', '#A45EE5', '#50C878']
        }
    };

    return (
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloDashboard.ajusteTela}>
                    <div className={EstiloDashboard.containerDash}>
                        <Geral data={dashboardData.geral} />
                        <Graficos data={dashboardData.graficos} />
                        <AnoNasc data={dashboardData.anoNascimento.data} />
                        <hr className={EstiloDashboard.hrContainer} />
                        <CidadeUnidade data={dashboardData.cidadeUnidade} />
                        <Comparativo data={dashboardData.comparativo} />
                        <AlunosCidade data={dashboardData.alunosPorCidade} />
                    </div>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    )
}