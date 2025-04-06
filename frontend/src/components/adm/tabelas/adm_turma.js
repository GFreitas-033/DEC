import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import ContainerCss from "../../containers.module.css";
import EstiloAdmTurma from "./admAPUT.module.css";

import Background_Sistema from "../../background/backSistema/backSistema";
import Botao from "../botao_adm/botao_adm";
import BarraLateral from "../../barra_lateral/icons_barra_lateral";
import Notifica from "../../sino_notificacao/notificacao";
import BtnVoltar from "../../btnVoltar/btnVoltar";

export default function Adm_turma(){
    const navigate = useNavigate();
    const [turmas, setTurmas] = useState([]);

    const alertRemoverTurma = (id_turma) =>{
        Swal.fire({
            title: "Quer Realmente Excluir essa Turma?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Excluir Turma!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Turma Excluida com Sucesso!",
                    icon: "success"
                });
                excluirTurma(id_turma);
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

    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloAdmTurma.contentAdm}>
                    <h1 className={EstiloAdmTurma.titulo}>Turmas</h1>
                    <div className={EstiloAdmTurma.divBtn}>
                        <Botao url={'/cadastro/turma'} texto={"Nova Turma +"}/>
                        <p className={EstiloAdmTurma.qtd}>Quantidade de Turmas: {turmas.length}</p>
                    </div>
                    <table className={EstiloAdmTurma.tabela}>
                        <thead>
                            <tr>
                                <td className={EstiloAdmTurma.colunaId}>
                                    <p><b><u>ID</u></b></p>
                                </td>
                                <td className={EstiloAdmTurma.colunaNome}>
                                    <p><b><u>Nome</u></b></p>
                                </td>
                                <td className={EstiloAdmTurma.colunaAcao}>
                                    <p><b><u>Ação</u></b></p>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {turmas.map(turma => (
                                <tr key={turma.id_turma}>
                                    <td className={EstiloAdmTurma.colunaId}>
                                        {turma.id_turma}
                                    </td>
                                    <td>
                                        {turma.nome_turma}
                                    </td>
                                    <td className={EstiloAdmTurma.colunaAcao}>
                                        <img 
                                            src={require('../../../imgs/icons/Editar.png')}
                                            alt="Editar" 
                                            className={EstiloAdmTurma.icon} 
                                            onClick={() => navigate(`/editar_turma/${turma.id_turma}`)}
                                        />
                                        <img 
                                            src={require('../../../imgs/icons/Excluir.png')}
                                            alt="Excluir" 
                                            className={EstiloAdmTurma.icon} 
                                            onClick={() => alertRemoverTurma(turma.id_turma)}
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