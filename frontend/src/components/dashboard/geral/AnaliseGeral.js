import React from "react";

import EstiloGeral from "./geral.module.css"

export default function Geral({ data }) {
    return (
        <div className={EstiloGeral.containerGeral}>
            <h1 className={EstiloGeral.title}>Total de Alunos</h1>
            <div className={EstiloGeral.part1}>
                <span className={EstiloGeral.spanAluno}>{data.totalAlunos}</span>
                <img src={require('../../../imgs/iconsDashboard/group.png')}
                    className={EstiloGeral.iconGroup} draggable="false"
                    alt="Imagem Grupo" />
            </div>
            <hr className={EstiloGeral.hrGeral} />
            <div className={EstiloGeral.bloquinhosGeral}>
                <h2 className={EstiloGeral.definicao}>Ativos</h2>
                <h2 className={EstiloGeral.resultado}>{data.ativos}</h2>
            </div>
            <div className={EstiloGeral.bloquinhosGeral}>
                <h2 className={EstiloGeral.definicao}>Inativos</h2>
                <h2 className={EstiloGeral.resultado}>{data.inativos}</h2>
            </div>
            <div className={EstiloGeral.bloquinhosGeral}>
                <h2 className={EstiloGeral.definicao}>Pagante</h2>
                <h2 className={EstiloGeral.resultado}>{data.pagantes}</h2>
            </div>
            <div className={EstiloGeral.bloquinhosGeral}>
                <h2 className={EstiloGeral.definicao}>Não Pagante</h2>
                <h2 className={EstiloGeral.resultado}>{data.naoPagantes}</h2>
            </div>
        </div>
    )
}