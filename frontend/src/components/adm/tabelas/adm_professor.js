import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ContainerCss from "../../containers.module.css";
import EstiloAdmProf from "./admAPUT.module.css";

import Botao from "../botao_adm/botao_adm";
import BarraLateral from "../../barra_lateral/icons_barra_lateral";
import Notifica from "../../sino_notificacao/notificacao";

export default function Adm_prof(){
    const navigate = useNavigate();
    const [professores, setProfessores] = useState([]);

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

    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <div className={EstiloAdmProf.contentAdm}>
                <h1 className={EstiloAdmProf.titulo}>Professores</h1>
                <div className={EstiloAdmProf.divBtn}>
                    <Botao url={'/cadastro/professor'} texto={"Novo Professor +"}/>
                    <p className={EstiloAdmProf.qtd}>Quantidade de Professores: {professores.length}</p>
                </div>
                <table className={EstiloAdmProf.tabela}>
                    <thead>
                        <tr>
                            <td className={EstiloAdmProf.colunaId}>
                                <p><b><u>ID</u></b></p>
                            </td>
                            <td className={EstiloAdmProf.colunaNome}>
                                <p><b><u>Nome</u></b></p>
                            </td>
                            <td className={EstiloAdmProf.colunaAcao}>
                                <p><b><u>Ação</u></b></p>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {professores.map(professor => (
                            <tr key={professor.id_pessoa}>
                                <td className={EstiloAdmProf.colunaId}>
                                    {professor.id_pessoa}
                                </td>
                                <td>
                                    {professor.nome_pessoa}
                                </td>
                                <td className={EstiloAdmProf.colunaAcao}>
                                    <img 
                                        src={require('../../../imgs/icons/Editar.png')}
                                        alt="Editar" 
                                        className={EstiloAdmProf.icon} 
                                        onClick={() => navigate(`/editar_prof/${professor.id_pessoa}`)}
                                    />
                                    <img 
                                        src={require('../../../imgs/icons/Excluir.png')}
                                        alt="Excluir" 
                                        className={EstiloAdmProf.icon} 
                                        onClick={() => excluirProfessor(professor.id_pessoa)}
                                    />
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