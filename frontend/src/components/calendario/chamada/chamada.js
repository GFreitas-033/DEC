import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import EstiloChamada from "./chamada.module.css";
import ContainerCss from "../../containers.module.css";

import Background_Sistema from "../../background/backSistema/backSistema";
import Barra_lateral from "../../barra_lateral/icons_barra_lateral";
import Notifica from "../../sino_notificacao/notificacao";
import BtnVoltar from "../../btnVoltar/btnVoltar";

export default function Chamada() {
    const { idturma } = useParams();
    const [data, setData] = useState(() => new Date().toISOString().split("T")[0]);
    const [chamada, setChamada] = useState([]);
    const [statusC, setStatusC] = useState(0);
    const [observacao, setObservacao] = useState("");

    useEffect(() => {
        fetchChamada();
    }, [data]);

    const fetchChamada = async () => {
        try {
            setObservacao("");
            const res = await axios.post("/api/chamada/buscar", {
                id_turma: idturma,
                data_c: data,
            });
    
            const responseData = res.data;
    
            if (responseData.length === 0) {
                Swal.fire({
                    title: "Chamada indisponível.",
                    icon: "warning",
                    confirmButtonColor: "#fbd034",
                    background: "#2b2b2b",
                    theme: "dark"
                });
                return;
            }
    
            const statusFromAPI = responseData.find(c => c.status_c !== null)?.status_c || 0;
    
            setChamada(responseData);
            setObservacao(responseData[0].observacao);
            setStatusC(statusFromAPI);
    
        } catch (error) {
            console.error("Erro ao buscar chamada:", error);
            Swal.fire({
                title: "Não foi possível buscar a chamada.",
                icon: "error",
                confirmButtonColor: "#fbd034",
                background: "#2b2b2b",
                theme: "dark"
            });
        }
    };

    const enviarChamada = async () => {
        const id_chamada = chamada[0]?.id_chamada;
        const alunos = chamada.filter(a => a.nome_pessoa !== null).map(a => ({
            id_aluno: a.id_aluno,
            presenca: a.presenca || 0
        }));

        Swal.fire({
            title: "Deseja Confirmar o Envio da Chamada?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            confirmButtonColor: "#fbd034",
            iconColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.post("/api/chamada/enviar", {
                        id_chamada,
                        status_c: 1,
                        alunos,
                        observacao
                    });
                    await fetchChamada();
                    Swal.fire({
                        title: "Chamada Registrada com Sucesso!",
                        icon: "success",
                        confirmButtonColor: "#fbd034",
                        background: "#2b2b2b",
                        theme: "dark"
                    });
                } catch (err) {
                    console.error("Erro ao enviar chamada:", err);
                    Swal.fire({
                        title: "Não foi possível enviar a chamada.",
                        icon: "error",
                        confirmButtonColor: "#fbd034",
                        background: "#2b2b2b",
                        theme: "dark"
                    });
                }
            }
        });
    };

    const handleChangeData = (e) => {
        setData(e.target.value);
    };

    return (
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <Barra_lateral />
                <div className={EstiloChamada.ajuste}>
                    <div className={EstiloChamada.container_chamada}>
                        <table className={EstiloChamada.tabela}>
                            <thead>
                                <tr>
                                    <td className={EstiloChamada.colunaPresenca}><p><b><u>Presença</u></b></p></td>
                                    <td className={EstiloChamada.colunaNome}><p><b><u>Nome</u></b></p></td>
                                </tr>
                            </thead>
                            <tbody>
                                {chamada.filter(c => c.nome_pessoa !== null).map((aluno, index) => (
                                    <tr key={index}>
                                        <td className={EstiloChamada.colunaPresenca}>
                                            <input
                                                type="checkbox"
                                                checked={aluno.presenca === 1}
                                                disabled={statusC === 1}
                                                onChange={() => {
                                                    if (statusC !== 1) {
                                                        setChamada(prev =>
                                                            prev.map(item =>
                                                                item.id_aluno === aluno.id_aluno
                                                                    ? { ...item, presenca: item.presenca === 1 ? 0 : 1 }
                                                                    : item
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        </td>
                                        <td>{aluno.nome_pessoa}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={EstiloChamada.divObservacao}>
                            <p className={EstiloChamada.status}>
                                Status:
                                <span className={statusC === 1 ? EstiloChamada.azul : EstiloChamada.vermelho}>
                                    {statusC === 1 ? " Finalizada" : " A ser Feita"}
                                </span>
                            </p>
                            <input
                                type="date"
                                className={EstiloChamada.inputData}
                                value={data}
                                onChange={handleChangeData}
                            />
                            <label className={EstiloChamada.labelObservacao}>Observações</label>
                            <textarea
                                type="text"
                                className={EstiloChamada.inputObservacao}
                                placeholder="Digite sua observação aqui..."
                                value={observacao}
                                onChange={(e) => setObservacao(e.target.value)}
                                disabled={statusC === 1}
                            />
                            {statusC !== 1 && (
                                <div className={EstiloChamada.divbtnEnviar}>
                                    <button
                                        className={EstiloChamada.btnEnviarChamada}
                                        onClick={enviarChamada}
                                    >
                                        Enviar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    );
}
