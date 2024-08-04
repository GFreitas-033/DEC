// src/components/Content_adm_aluno.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdmAluno from "../admAPUT.module.css";

import Botao from "../botao_adm/botao_adm";
import Editar from "../../../imgs/Editar.png";
import Excluir from "../../../imgs/Excluir.png";

export default function Content_adm_aluno() {
    const navigate = useNavigate();
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/admbackend/aluno');
                setAlunos(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados dos alunos:', error);
            }
        }
        fetchData();
    }, []);

    const excluirAluno = async (id_aluno) => {
        try {
            const exclusao = await axios.get(`/admbackend/excluiraluno/${id_aluno}`);
            setAlunos(prevAlunos => prevAlunos.filter(aluno => aluno.id_pessoa !== id_aluno));
        } catch (error) {
            console.error('Erro ao excluir aluno:', error);
        }
    };

    return (
        <div className={AdmAluno.contentAdm}>
            <div>
                <h1 className={AdmAluno.titulo}>ALUNOS</h1>
            </div>

            <div className={AdmAluno.divBtn}>
                <Botao texto={"Importar +"}/>
                <p className={AdmAluno.qtd}>Quantidade de Alunos: {alunos.length}</p>
            </div>

            <table>
                <tr>

                    <td>
                        <p className={AdmAluno.topoTable}><b><u>ID</u></b></p>
                    </td>

                    <td>
                        <p className={AdmAluno.topoTable}><b><u>Nome</u></b></p>
                    </td>
                </tr>

                <tr>

                    <td>
                        {alunos.map(aluno => (
                            <p key={aluno.id_pessoa}>{aluno.id_pessoa}</p>
                        ))}
                    </td>

                    <td>
                        {alunos.map(aluno => (
                            <p key={aluno.id_pessoa}>
                                {aluno.nome_pessoa}
                                <img 
                                    src={Excluir} 
                                    className={AdmAluno.icon} 
                                    onClick={() => excluirAluno(aluno.id_pessoa)}
                                />
                                <img 
                                    src={Editar} 
                                    className={AdmAluno.icon} 
                                    onClick={() => navigate(`/adm/editar_aluno/${aluno.id_pessoa}`)}
                                />
                            </p>
                        ))}
                    </td>
                </tr>
            </table>
        </div>
    );
}
