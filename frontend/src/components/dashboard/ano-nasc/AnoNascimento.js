import React from "react";

import EstiloAnoNasc from "./anoNascimento.module.css";

export default function AnoNasc(){
    return(
        <div className={EstiloAnoNasc.containerAnoNasc}>
            <h1 className={EstiloAnoNasc.titulo}>Quantidade de Alunos por Ano de Nascimento</h1>
            <hr className={EstiloAnoNasc.hrAno} />
            {/* Começo da Tabela */}
            <div className={EstiloAnoNasc.bloquinhosAno}>
                <h2 className={EstiloAnoNasc.definicao}>Ano</h2>
                <h2 className={EstiloAnoNasc.resultado}>Quantidade</h2>
            </div>
            <div className={EstiloAnoNasc.bloquinhosAno}>
                <h2 className={EstiloAnoNasc.definicao}>2008</h2>
                <h2 className={EstiloAnoNasc.resultado}>120</h2>
            </div>
            <div className={EstiloAnoNasc.bloquinhosAno}>
                <h2 className={EstiloAnoNasc.definicao}>2009</h2>
                <h2 className={EstiloAnoNasc.resultado}>95</h2>
            </div>
            <div className={EstiloAnoNasc.bloquinhosAno}>
                <h2 className={EstiloAnoNasc.definicao}>2010</h2>
                <h2 className={EstiloAnoNasc.resultado}>80</h2>
            </div>
            <div className={EstiloAnoNasc.bloquinhosAno}>
                <h2 className={EstiloAnoNasc.definicao}>2011</h2>
                <h2 className={EstiloAnoNasc.resultado}>85</h2>
            </div>
            <div className={EstiloAnoNasc.bloquinhosAno}>
                <h2 className={EstiloAnoNasc.definicao}>2012</h2>
                <h2 className={EstiloAnoNasc.resultado}>40</h2>
            </div>
            {/* <div className={EstiloAnoNasc.bloquinhosAno}>
                <h2 className={EstiloAnoNasc.definicao}>2012</h2>
                <h2 className={EstiloAnoNasc.resultado}>40</h2>
            </div> */}
        </div>
    )
}