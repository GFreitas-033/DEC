import React from "react";

import EstiloAnoNasc from "./anoNascimento.module.css";

export default function AnoNasc({ data }) {
    return (
        <div className={EstiloAnoNasc.containerAnoNasc}>
            <h1 className={EstiloAnoNasc.titulo}>Quantidade de Alunos por Ano de Nascimento</h1>
            <hr className={EstiloAnoNasc.hrAno} />
            {/* Cabeçalho da Tabela */}
            <div className={EstiloAnoNasc.bloquinhosAno}>
                <h2 className={EstiloAnoNasc.definicao}>Ano</h2>
                <h2 className={EstiloAnoNasc.resultado}>Quantidade</h2>
            </div>
            {/* Dados da Tabela */}
            {data.map((item, index) => (
                <div key={index} className={EstiloAnoNasc.bloquinhosAno}>
                    <h2 className={EstiloAnoNasc.definicao}>{item.ano}</h2>
                    <h2 className={EstiloAnoNasc.resultado}>{item.quantidade}</h2>
                </div>
            ))}
        </div>
    )
}