// src/components/Content_adm_professor.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdmProf from "../admAPUT.module.css";
import Botao from "../botao_adm/botao_adm";
import Editar from "../../../imgs/Editar.png";
import Excluir from "../../../imgs/Excluir.png";

export default function Content_adm_professor() {
    const navigate = useNavigate();
    const [professores, setProfessores] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/admbackend/professor');
                setProfessores(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados dos professores:', error);
            }
        }
        fetchData();
    }, []);

    const excluirProfessor = async (id_professor) => {
        try {
            await axios.get(`/admbackend/excluirprofessor/${id_professor}`);
            setProfessores(prevProfessores => prevProfessores.filter(professor => professor.id_pessoa !== id_professor));
        } catch (error) {
            console.error('Erro ao excluir professor:', error);
        }
    };

    return (
        <div className={AdmProf.contentAdm}>
            <div>
                <h1 className={AdmProf.titulo}>Professores</h1>
            </div>

            <div className={AdmProf.divBtn}>
                <Botao url={'/cadastro/professor'} texto={"Novo Professor +"}/>
                <p className={AdmProf.qtd}>Quantidade de Professores: {professores.length}</p>
            </div>
            
            <div className={AdmProf.tabela}>
                <div className={AdmProf.linhasId}>
                    <ul className={AdmProf.colunaID}>
                        <li className={AdmProf.topoTable}><b><u>ID</u></b></li>
                        {professores.map(professor => (
                            <li key={professor.id_pessoa}>{professor.id_pessoa}</li>
                        ))}
                    </ul>
                </div>
                <div className={AdmProf.linhasNome}>
                    <ul>
                        <li className={AdmProf.topoTable}><b><u>Nome</u></b></li>
                        {professores.map(professor => (
                            <li key={professor.id_pessoa}>
                                {professor.nome_pessoa}
                                <img 
                                    src={Excluir} 
                                    className={AdmProf.icon} 
                                    onClick={() => excluirProfessor(professor.id_pessoa)}
                                />
                                <img 
                                    src={Editar} 
                                    className={AdmProf.icon} 
                                    onClick={() => navigate(`/adm/editar_professor/${professor.id_pessoa}`)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
