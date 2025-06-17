// Comparativo.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import EstiloComparativo from "./comparativo.module.css";

export default function ComparativoPeriodo({ filters }) {
    const [data1, setData1] = useState("");
    const [data2, setData2] = useState("");
    const [comparativoData, setComparativoData] = useState({
        alunosData1: 0,
        alunosData2: 0,
    });
    const [loading, setLoading] = useState(false);

    // Função de formatação original
    const formatarData = (data) => {
        if (!data) {
            return "Selecione uma Data";
        }
        const meses = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        const partes = data.split("-");
        const ano = partes[0];
        const mes = parseInt(partes[1], 10) - 1;
        return `${meses[mes]}/${ano}`;
    };

    useEffect(() => {
        const fetchComparativoData = async () => {
            if (data1 && data2) {
                setLoading(true);
                try {
                    const response = await axios.get("/api/dashboard/comparativo", {
                        params: { data1, data2, ...filters },
                    });
                    setComparativoData(response.data);
                } catch (error) {
                    console.error("Erro ao buscar dados comparativos:", error);
                    setComparativoData({ alunosData1: 0, alunosData2: 0 });
                } finally {
                    setLoading(false);
                }
            } else {
                 // Reseta os dados se as datas não estiverem preenchidas
                setComparativoData({ alunosData1: 0, alunosData2: 0 });
            }
        };
        fetchComparativoData();
    }, [data1, data2, filters]);

    const { alunosData1, alunosData2 } = comparativoData;
    const variacao = alunosData2 - alunosData1;
    const crescimento = alunosData1 > 0 ? ((variacao / alunosData1) * 100).toFixed(1) : 0;

    return (
        <div className={EstiloComparativo.containerComparativo}>
            <h1 className={EstiloComparativo.titulo}>Comparativo Por Período</h1>

            <input type="date" className={EstiloComparativo.inputData}
                value={data1} onChange={(e) => setData1(e.target.value)}
            />
            <input type="date" className={EstiloComparativo.inputData}
                value={data2} onChange={(e) => setData2(e.target.value)}
            />

            {loading ? <p style={{textAlign: 'center', marginTop: '1rem'}}>Calculando...</p> : (
                <>
                    <div className={EstiloComparativo.divComparacao}>
                        <p>{formatarData(data1)}{data1 ? `: ${alunosData1} alunos` : ""}</p>
                        <p>{formatarData(data2)}{data2 ? `: ${alunosData2} alunos` : ""}</p>
                    </div>
                    <div className={EstiloComparativo.divComparacao}>
                        <p>📈 Variação: {data1 && data2 ? `${variacao >= 0 ? '+' : ''}${variacao} alunos` : 0}</p>
                        <p>📊 Crescimento de: {data1 && data2 ? `${crescimento >= 0 ? '+' : ''}${crescimento}%` : 0}</p>
                    </div>
                </>
            )}
        </div>
    );
}