import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import ContainerCss from "../../containers.module.css";
import EstiloAdmResp from "./admAPUT.module.css";

import Background_Sistema from "../../background/BackSistema";
import BarraLateral from "../../barra-lateral/BarraLateral";
import Notifica from "../../sino-notificacao/Notificacao";
import BtnVoltar from "../../btn-voltar/BotaoVoltar";

export default function Adm_responsaveis() {
    const navigate = useNavigate();
    const [responsaveis, setResponsaveis] = useState([]);
    
    const alertRemoverResponsavel = (id_responsavel) =>{
        Swal.fire({
            title: "Quer Realmente Excluir esse Responsavel?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Excluir Responsavel!",
            confirmButtonColor: "#fbd034",
            iconColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        }).then((result) => {
            if (result.isConfirmed) {
                excluirResponsavel(id_responsavel);
            }
        });
    }

    useEffect(() => {
        logado();
    }, []);

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
                const response = await axios.get('/api/responsavel_aluno');
                setResponsaveis(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados das responsaveis:', error);
            }
        }
        fetchData();
    }, []);

    const excluirResponsavel = async (id_responsavel) => {
        try {
            await axios.get(`/admbackend/excluirresponsavel/${id_responsavel}`);
            setResponsaveis(prevResponsavel => prevResponsavel.filter(responsavel => responsavel.id_pessoa !== id_responsavel));
            Swal.fire({
                title: "Responsável Excluído com Sucesso!",
                icon: "success",
                confirmButtonColor: "#fbd034",
                background: "#2b2b2b",
                theme: "dark"
            });
        } catch (error) {
            console.error('Erro ao excluir responsavel:', error);
            Swal.fire({
                title: "Erro ao Excluir Responsavel!",
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
                <div className={EstiloAdmResp.contentAdm}>
                    <h1 className={EstiloAdmResp.titulo}>Responsaveis</h1>
                    <table className={EstiloAdmResp.tabela}>
                        <thead>
                            <tr>
                                <td className={EstiloAdmResp.colunaId}><p><b><u>ID</u></b></p></td>
                                <td className={EstiloAdmResp.colunaNome}><p><b><u>Nome</u></b></p></td>
                                <td className={EstiloAdmResp.colunaAcao}><p><b><u>Ação</u></b></p></td>
                            </tr>
                        </thead>
                        <tbody>
                            {responsaveis.map((responsavel, index) => (
                                <tr key={`${responsavel.id_pessoa}-${index}`}>
                                    <td className={EstiloAdmResp.colunaId}>{responsavel.id_pessoa}</td>
                                    <td>{responsavel.nome_pessoa}</td>
                                    <td className={EstiloAdmResp.colunaAcao}>
                                        <img src={require('../../../imgs/icons/Editar.png')} alt="Editar" className={EstiloAdmResp.icon} onClick={() => navigate(`/editar/responsavel/${responsavel.id_pessoa}`)} />
                                        <img src={require('../../../imgs/icons/Excluir.png')} alt="Excluir" className={EstiloAdmResp.icon} onClick={() => alertRemoverResponsavel(responsavel.id_pessoa)} />
                                        <img src={require('../../../imgs/icons/visao.png')} alt="Visualizar" className={EstiloAdmResp.icon} onClick={() => navigate(`/adm/InformaçõesDoResponsavel/${responsavel.id_pessoa}`)} />
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