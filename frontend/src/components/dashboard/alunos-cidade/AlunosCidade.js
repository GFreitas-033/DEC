import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

import EstiloAlunosCidade from "./alunosCidade.module.css";

export default function Alunos_Cidade(){

    const data = [
        { cidade: 'Lins', alunos: 1600 },
        { cidade: 'Bauru', alunos: 900 },
        { cidade: 'Rio Preto', alunos: 750 },
        { cidade: 'Promissão', alunos: 700 },
        { cidade: 'Guaíçara', alunos: 550 },
        { cidade: 'Cafelândia', alunos: 500 },
    ];

    // Ordenar do maior para o menor
    const dataOrdenada = [...data].sort((a, b) => b.alunos - a.alunos);

    const cores = ['#FBD034', '#34A0F2', '#F27457', '#8AD1C2', '#A45EE5', '#50C878'];

    const altura= data.length * 50;

    return(
        <div className={EstiloAlunosCidade.containerAlunosCidade}>
            <h1 className={EstiloAlunosCidade.titulo}>Alunos por Cidade</h1>
            
            <ResponsiveContainer width="100%" height={altura}>
                <BarChart
                    layout="vertical"
                    data={dataOrdenada}
                    margin={{ top: 20, right: 50, left: 0, bottom: 0 }}
                >
                    <XAxis type="number" hide />
                    <YAxis dataKey="cidade" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="alunos" barSize={20}>
                        {dataOrdenada.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                        ))}
                        <LabelList dataKey="alunos" position="right" fill="#000" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}