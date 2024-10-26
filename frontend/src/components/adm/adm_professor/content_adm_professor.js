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
            
            <table className={AdmProf.tabela}>
                <thead>
                    <tr>
                        <td className={AdmProf.ids}>
                            <p><b><u>ID</u></b></p>
                        </td>
                        <td>
                            <p><b><u>Nome</u></b></p>
                        </td>
                    </tr>
                </thead>
                
                <tbody>
                    {professores.map(professor => (
                        <tr key={professor.id_pessoa}>
                            <td>
                                <div className={AdmProf.divIds}>
                                    <p className={AdmProf.Id}>{professor.id_pessoa}</p>
                                    <img 
                                        src={Excluir} 
                                        className={AdmProf.icon} 
                                        ontdck={() => excluirProfessor(professor.id_pessoa)}
                                    />
                                    <img 
                                        src={Editar} 
                                        className={AdmProf.icon} 
                                        onClick={() => navigate(`/adm/editar_prof/${professor.id_pessoa}`)}
                                    />
                                </div>
                            </td>
                            <td className={AdmProf.colunaNome}>
                                {professor.nome_pessoa}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
