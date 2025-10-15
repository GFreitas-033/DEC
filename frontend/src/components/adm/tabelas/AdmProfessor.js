import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import ContainerCss from "../../containers.module.css";
import EstiloAdmProf from "./admAPUT.module.css";

import Background_Sistema from "../../background/BackSistema";
import BarraLateral from "../../barra-lateral/BarraLateral";
import Notifica from "../../sino-notificacao/Notificacao";
import BtnVoltar from "../../btn-voltar/BotaoVoltar";

export default function Adm_prof(){
    const navigate = useNavigate();
    const [professores, setProfessores] = useState([]);

    const alertRemoverProfessor = (id_professor) =>{
        Swal.fire({
            title: "Quer Realmente Excluir esse(a) Professor(a)?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Excluir Professor(a)!",
            confirmButtonColor: "#fbd034",
            iconColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        }).then((result) => {
            if (result.isConfirmed) {
                excluirProfessor(id_professor);
            }
        });
    }

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
            Swal.fire({
                title: "Professor(a) Excluido com Sucesso!",
                icon: "success",
                confirmButtonColor: "#fbd034",
                background: "#2b2b2b",
                theme: "dark"
            });
        } catch (error) {
            console.error('Erro ao excluir professor:', error);
            Swal.fire({
                title: "Erro ao Excluir Professor(a)!",
                icon: "error",
                confirmButtonColor: "#fbd034",
                background: "#2b2b2b",
                theme: "dark"
            });
        }
    };

    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloAdmProf.contentAdm}>
                    <h1 className={EstiloAdmProf.titulo}>Professores</h1>
                    <div className={`${EstiloAdmProf.divFiltro} ${EstiloAdmProf.divDisponibilidade}`}
                    onClick={()=>{navigate('disponibilidade')}}>
                        <img src={require('../../../imgs/icons/disponibilidade.png')} 
                        className={EstiloAdmProf.imgDisponibilidade}/>
                        <h1 className={EstiloAdmProf.textoFiltro}>Disponibilidade dos(as) Professores(as)</h1>
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
                                            onClick={() => alertRemoverProfessor(professor.id_pessoa)}
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

// Ícone de agenda com uma seta ou símbolo de aberto