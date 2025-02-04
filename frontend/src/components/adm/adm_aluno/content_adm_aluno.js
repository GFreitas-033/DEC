import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdmAluno from "../admAPUT.module.css";
import Editar from "../../../imgs/icons/Editar.png";
import Excluir from "../../../imgs/icons/Excluir.png";

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
                <p className={AdmAluno.qtd}>Quantidade de Alunos: {alunos.length}</p>
            </div>

            <table className={AdmAluno.tabela}>
                <thead>
                    <tr>
                        <td className={AdmAluno.ids}>
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
                                <div className={AdmAluno.divIds}>
                                    <p className={AdmAluno.Id}>{aluno.id_pessoa}</p>
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
                                </div>
                            </td>
                            <td className={AdmAluno.colunaNome}>
                                {aluno.nome_pessoa}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
