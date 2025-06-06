import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import EstiloGraficos from "./graficos.module.css";

export default function BlocoGraficos() {
    const [tela, setTela] = useState();

    useEffect(() => {
        const handleResize = () => {
            const largura = window.innerWidth;
            if (largura <= 1366) {
                setTela(80);
            } else if (largura <= 1750) {
                setTela(100);
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
        { name: "Destro", value: 2500 },
        { name: "Canhoto", value: 2500 },
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
                <h1 className={EstiloGraficos.titulo}>Meninos X Meninas</h1>
                <ResponsiveContainer width="100%" height={250}>
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
                {/* Legenda */}
                <div className={EstiloGraficos.legenda}>
                    <div className={EstiloGraficos.ajusteLegenda}>
                        {dataGenero.map((entry, index) => (
                            <div key={`legenda-${entry.name}-${index}`}
                                className={EstiloGraficos.itemLegenda}>
                                <div className={EstiloGraficos.caixaCor}
                                style={{ backgroundColor: coresG1[index % coresG1.length] }}
                            ></div>
                                <span>{entry.name} {calcularPorcentagem(entry.value, total)}</span>
                            </div>
                        ))}
                    </div>
                    <img src={require('../../../imgs/iconsDashboard/boygirl.png')} 
                     alt="Icon de Garato e Garota" className={EstiloGraficos.iconsGrafico} />
                </div>
            </div>
            {/* Grafico 2 */}
            <div className={EstiloGraficos.divGrafico}>
                <h1 className={EstiloGraficos.titulo}>Destro X Canhoto</h1>
                <ResponsiveContainer width="100%" height={250}>
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
                {/* Legenda */}
                <div className={EstiloGraficos.legenda}>
                    <div className={EstiloGraficos.ajusteLegenda}>
                        {dataDestroCanhoto.map((entry, index) => (
                            <div key={`legenda-destro-${entry.name}-${index}`}
                            className={EstiloGraficos.itemLegenda}>
                                <div className={EstiloGraficos.caixaCor}
                                style={{ backgroundColor: coresG2[index % coresG2.length] }}></div>
                                    <span>{entry.name} {entry.value}</span>
                            </div>
                        ))}
                    </div>
                    <img src={require('../../../imgs/iconsDashboard/perfil.png')} 
                     alt="Icon de Perfil" className={EstiloGraficos.iconsGrafico} />
                </div>
            </div>
        </div>
    );
}