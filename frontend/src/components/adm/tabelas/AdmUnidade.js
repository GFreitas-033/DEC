import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import ContainerCss from "../../containers.module.css";
import EstiloAdmUnidade from "./admAPUT.module.css";

import BackgroundSistema from "../../background/BackSistema";
import BarraLateral from "../../barra-lateral/BarraLateral";
import Notifica from "../../sino-notificacao/Notificacao";
import BtnVoltar from "../../btn-voltar/BotaoVoltar";

export default function Adm_unidade(){
    const navigate = useNavigate();
    const [unidades, setUnidades] = useState([]);

    const alertRemoverUnidade = (id_unidade) =>{
        Swal.fire({
            title: "Quer Realmente Excluir essa Unidade?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Excluir Unidade!",
            confirmButtonColor: "#fbd034",
            iconColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        }).then((result) => {
            if (result.isConfirmed) {
                excluirUnidade(id_unidade);
            }
        });
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/unidade');
                setUnidades(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados das unidades:', error);
            }
        }
        fetchData();
    }, []);

    const excluirUnidade = async (id_unidade) => {
        try {
            // const responseUnidade = await axios.get(`/admbackend/excluirunidade/${id_unidade}`);
            setUnidades(prevUnidades => prevUnidades.filter(unidade => unidade.id_unidade !== id_unidade));
            Swal.fire({
                title: "Unidade Excluida com Sucesso!",
                icon: "success",
                confirmButtonColor: "#fbd034",
                background: "#2b2b2b",
                theme: "dark"
            });
        } catch (error) {
            console.error('Erro ao excluir unidade:', error);
            Swal.fire({
                title: "Erro ao Excluir Unidade!",
                icon: "error",
                confirmButtonColor: "#fbd034",
                background: "#2b2b2b",
                theme: "dark"
            });
        }
    };

    return(
        <div>
            <BackgroundSistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloAdmUnidade.contentAdm}>
                    <h1 className={EstiloAdmUnidade.titulo}>Unidade</h1>
                    <table className={EstiloAdmUnidade.tabela}>
                        <thead>
                            <tr>
                                <td className={EstiloAdmUnidade.colunaId}>
                                    <p><b><u>ID</u></b></p>
                                </td>
                                <td className={EstiloAdmUnidade.colunaNome}>
                                    <p><b><u>Nome</u></b></p>
                                </td>
                                <td className={EstiloAdmUnidade.colunaAcao}>
                                    <p><b><u>Ação</u></b></p>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {unidades.map(unidade => (
                                <tr key={unidade.id_unidade}>
                                    <td className={EstiloAdmUnidade.colunaId}>
                                        {unidade.id_unidade}
                                    </td>
                                    <td>
                                        {unidade.nome_unidade}
                                    </td>
                                    <td className={EstiloAdmUnidade.colunaAcao}>
                                        <img 
                                            src={require('../../../imgs/icons/Editar.png')}
                                            alt="Editar" 
                                            className={EstiloAdmUnidade.icon} 
                                            onClick={() => navigate(`/editar_unidade/${unidade.id_unidade}`)}
                                        />
                                        <img 
                                            src={require('../../../imgs/icons/Excluir.png')} 
                                            alt="Excluir"
                                            className={EstiloAdmUnidade.icon} 
                                            onClick={() => alertRemoverUnidade(unidade.id_unidade)}
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