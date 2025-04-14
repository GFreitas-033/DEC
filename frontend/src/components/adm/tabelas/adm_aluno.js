import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import ContainerCss from "../../containers.module.css";
import EstiloAdmAluno from "./admAPUT.module.css";

import Background_Sistema from "../../background/backSistema/backSistema";
import BarraLateral from "../../barra_lateral/icons_barra_lateral";
import Notifica from "../../sino_notificacao/notificacao";
import BtnVoltar from "../../btnVoltar/btnVoltar";

export default function Adm_aluno(){
    const navigate = useNavigate();
    const [alunos, setAlunos] = useState([]);

    const alertRemoverAluno = (id_aluno) =>{
        Swal.fire({
            title: "Quer Realmente Excluir esse(a) Aluno(a)?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Excluir Aluno!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Aluno Excluido com Sucesso!",
                    icon: "success"
                });
                excluirAluno(id_aluno);
            }
        });
    }

    useEffect(() => {
        logado();
    });

    const logado = async () => {
        try {
            let response = await axios.post('/login');
            response = response.data;
            if(response.adm!==1){
                navigate('/home');
            }
        } catch (error) {
            navigate('/');
        }
    };

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

    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloAdmAluno.contentAdm}>
                    <h1 className={EstiloAdmAluno.titulo}>ALUNOS</h1>
                    <table className={EstiloAdmAluno.tabela}>
                        <thead>
                            <tr>
                                <td className={EstiloAdmAluno.colunaId}>
                                    <p><b><u>ID</u></b></p>
                                </td>
                                <td className={EstiloAdmAluno.colunaNome}>
                                    <p><b><u>Nome</u></b></p>
                                </td>
                                <td className={EstiloAdmAluno.colunaAcao}>
                                    <p><b><u>Ação</u></b></p>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.map(aluno => (
                                <tr key={aluno.id_pessoa}>
                                    <td className={EstiloAdmAluno.colunaId}>
                                        {aluno.id_pessoa}
                                    </td>
                                    <td>
                                        {aluno.nome_pessoa}
                                    </td>
                                    <td className={EstiloAdmAluno.colunaAcao}>
                                        <img
                                            src={require('../../../imgs/icons/Editar.png')}
                                            alt="Editar"
                                            className={EstiloAdmAluno.icon}
                                            onClick={() => navigate(`/editar/aluno/${aluno.id_pessoa}`)}
                                        />
                                        <img
                                            src={require('../../../imgs/icons/Excluir.png')}
                                            alt="Excluir"
                                            className={EstiloAdmAluno.icon}
                                            onClick={() => alertRemoverAluno(aluno.id_pessoa)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    )
}