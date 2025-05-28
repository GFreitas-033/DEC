import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import EstiloGraficos from "./graficos.module.css";

export default function BlocoGraficos() {
    const [tela, setTela] = useState(() => {
        const largura = window.innerWidth;
        if (largura <= 1750) return 79;
        if (largura >= 1750) return 120;
    });

    useEffect(() => {
        const handleResize = () => {
            const largura = window.innerWidth;
            if (largura <= 1366) {
                setTela(79);
            } else if (largura <= 1750) {
                setTela(120);
            } else {
                setTela(150);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dataGenero = [
        { name: "Meninos", value: 2500 },
        { name: "Meninas", value: 2500 },
    ];

    const dataDestroCanhoto = [
        { name: "Meninos", value: 2500 },
        { name: "Meninas", value: 2500 },
    ];
    const coresG1 = ["#4867FF", "#FF4AE7"];
    const coresG2 = ["#42FF42", "#FF4545"];

    const total = dataGenero.reduce((acc, cur) => acc + cur.value, 0);

    const calcularPorcentagem = (valor, total) => {
        return ((valor / total) * 100).toFixed(0) + '%';
    }

    return (
        <div className={EstiloGraficos.containerGraficos}>
            {/* Grafico 1 */}
            <div className={EstiloGraficos.divGrafico}>
                <h1 className={EstiloGraficos.titulo}>% ENTRE MENINOS E MENINAS</h1>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={dataGenero} dataKey="value"
                          outerRadius={tela}
                          startAngle={90}
                          endAngle={450}
                        >
                            {dataGenero.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={coresG1[index % coresG1.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                {/* Conteúdo central */}
                <div className={EstiloGraficos.centroGrafico}>                    
                    <img src={require('../../../imgs/iconsDashboard/boygirl.png')} 
                    alt="Icon de Garato e Garota" className={EstiloGraficos.iconsGrafico} />                  
                    {/* Legenda */}
                    <div className={EstiloGraficos.legenda}>
                        {dataGenero.map((entry, index) => (
                            <div className={EstiloGraficos.itemLegenda}>
                                <div
                                    className={EstiloGraficos.caixaCor}
                                    style={{ backgroundColor: coresG1[index % coresG1.length] }}
                                ></div>
                                <span>{entry.name} {calcularPorcentagem(entry.value, total)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Grafico 2 */}
            <div className={EstiloGraficos.divGrafico}>
                <h1 className={EstiloGraficos.titulo}>DESTRO X CANHOTO</h1>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={dataDestroCanhoto} dataKey="value"
                          outerRadius={tela}
                          startAngle={90}
                          endAngle={450}
                        >
                            {dataDestroCanhoto.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={coresG2[index % coresG2.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                {/* Conteúdo central */}
                <div className={EstiloGraficos.centroGrafico}>
                    <img src={require('../../../imgs/iconsDashboard/perfil.png')} 
                    alt="Icon de Perfil" className={EstiloGraficos.iconsGrafico} />
                    {/* Legenda */}
                    <div className={EstiloGraficos.legenda}>
                        {dataDestroCanhoto.map((entry, index) => (
                            <div className={EstiloGraficos.itemLegenda}>
                                <div
                                    className={EstiloGraficos.caixaCor}
                                    style={{ backgroundColor: coresG2[index % coresG2.length] }}
                                ></div>
                                <span>{entry.name} {entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}