import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ContainerCss from "../../containers.module.css";
import EstiloAdmAluno from "../admAPUT.module.css";

import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import Notifica from "../../sino_notificacao/notificacao"

export default function Adm_aluno(){
    const navigate = useNavigate();
    const [alunos, setAlunos] = useState([]);

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
        <div className={ContainerCss.container}>
            <BarraLateral />
            <div className={EstiloAdmAluno.contentAdm}>
                <div>
                    <h1 className={EstiloAdmAluno.titulo}>ALUNOS</h1>
                </div>
                <div className={EstiloAdmAluno.divBtn}>
                    <p className={EstiloAdmAluno.qtd}>Quantidade de Alunos: {alunos.length}</p>
                </div>
                <table className={EstiloAdmAluno.tabela}>
                    <thead>
                        <tr>
                            <td className={EstiloAdmAluno.ids}>
                                <p><b><u>ID</u></b></p>
                            </td>
                            <td>
                                <p><b><u>Nome</u></b></p>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map(aluno => (
                            <tr key={aluno.id_pessoa}>
                                <td>
                                    <div className={EstiloAdmAluno.divIds}>
                                        <p className={EstiloAdmAluno.Id}>{aluno.id_pessoa}</p>
                                        <img
                                            src={require('../../../imgs/icons/Excluir.png')}
                                            alt="Excluir"
                                            className={EstiloAdmAluno.icon}
                                            onClick={() => excluirAluno(aluno.id_pessoa)}
                                        />
                                        <img
                                            src={require('../../../imgs/icons/Editar.png')}
                                            alt="Editar"
                                            className={EstiloAdmAluno.icon}
                                            onClick={() => navigate(`/adm/editar_aluno/${aluno.id_pessoa}`)}
                                        />
                                    </div>
                                </td>
                                <td className={EstiloAdmAluno.colunaNome}>
                                    {aluno.nome_pessoa}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Notifica />
        </div>
    )
}