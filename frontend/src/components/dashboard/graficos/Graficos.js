import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import EstiloGraficos from "./graficos.module.css";

export default function BlocoGraficos() {
    const data = [
        { name: "Meninos", value: 2500 },
        { name: "Meninas", value: 2500 },
    ];

    const COLORS = ["#4867FF", "#FF4AE7"];

    return (
        <div className={EstiloGraficos.containerGraficos}>
 
            <div className={EstiloGraficos.wrapperGrafico}>
                <h3 className={EstiloGraficos.titulo}>% ENTRE MENINOS E MENINAS</h3>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={data} dataKey="value"
                          innerRadius={90}
                          outerRadius={110}
                          startAngle={90}
                          endAngle={450}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                {/* Conteúdo central */}
                <div className={EstiloGraficos.centroGrafico}>
                    <div>
                        Imagem1
                        Imagem2
                    </div>
                    {/* Legenda personalizada */}
                    <div className={EstiloGraficos.legenda}>
                        <div className={EstiloGraficos.itemLegenda}>
                            <div className={`${EstiloGraficos.caixaCor} ${EstiloGraficos.cor1}`} />
                            <span>Meninos</span>
                        </div>
                        <div className={EstiloGraficos.itemLegenda}>
                            <div className={`${EstiloGraficos.caixaCor} ${EstiloGraficos.cor2}`} />
                                <span>Meninas</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}