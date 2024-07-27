// src/components/Content_adm_turma.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdmTurma from "../admAPUT.module.css";
import Botao from "../botao_adm/botao_adm";
import Editar from "../../../imgs/Editar.png";
import Excluir from "../../../imgs/Excluir.png";

export default function Content_adm_turma() {
    const navigate = useNavigate();
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/turma');
                setTurmas(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados das turmas:', error);
            }
        }
        fetchData();
    }, []);

    const excluirTurma = async (id_turma) => {
        try {
            await axios.get(`/admbackend/excluirturma/${id_turma}`);
            setTurmas(prevTurmas => prevTurmas.filter(turma => turma.id_turma !== id_turma));
        } catch (error) {
            console.error('Erro ao excluir turma:', error);
        }
    };

    return (
        <div className={AdmTurma.contentAdm}>
            <div>
                <h1 className={AdmTurma.titulo}>Turmas</h1>
            </div>

            <div className={AdmTurma.divBtn}>
                <Botao url={'/cadastro/turma'} texto={"Nova Turma +"}/>
                <p className={AdmTurma.qtd}>Quantidade de Turmas: {turmas.length}</p>
            </div>
            
            <div className={AdmTurma.tabela}>
                <div className={AdmTurma.linhasId}>
                    <ul className={AdmTurma.colunaID}>
                        <li className={AdmTurma.topoTable}><b><u>ID</u></b></li>
                        {turmas.map(turma => (
                            <li key={turma.id_turma}>{turma.id_turma}</li>
                        ))}
                    </ul>
                </div>
                <div className={AdmTurma.linhasNome}>
                    <ul>
                        <li className={AdmTurma.topoTable}><b><u>Nome</u></b></li>
                        {turmas.map(turma => (
                            <li key={turma.id_turma}>
                                {turma.nome_turma}
                                <img 
                                    src={Excluir} 
                                    className={AdmTurma.icon} 
                                    onClick={() => excluirTurma(turma.id_turma)}
                                />
                                <img 
                                    src={Editar} 
                                    className={AdmTurma.icon} 
                                    onClick={() => navigate(`/adm/editar_turma/${turma.id_turma}`)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
