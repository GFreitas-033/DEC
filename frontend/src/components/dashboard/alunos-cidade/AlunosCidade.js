import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

import EstiloAlunosCidade from "./alunosCidade.module.css";

export default function Alunos_Cidade({ data }) {

    const dadosDoGrafico = data.data;
    const cores = data.cores;

    // Ordenar do maior para o menor
    const dataOrdenada = [...dadosDoGrafico].sort((a, b) => b.alunos - a.alunos);

    const altura = dataOrdenada.length * 50;

    return (
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
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '0.1rem solid #000',
                            color: '#000',
                            borderRadius: '0.5rem'
                        }}
                        labelStyle={{
                            fontWeight: 'bold'
                        }}
                        itemStyle={{
                            color: '#000',
                            backgroundColor: '#fff'
                        }}
                    />
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