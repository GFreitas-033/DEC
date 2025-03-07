import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ContainerCss from "../../containers.module.css";
import EstiloAdmUnidade from "./admAPUT.module.css";

import Botao from "../botao_adm/botao_adm";
import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import Notifica from "../../sino_notificacao/notificacao"

export default function Adm_unidade(){
    const navigate = useNavigate();
    const [unidades, setUnidades] = useState([]);

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
            const responseUnidade = await axios.get(`/admbackend/excluirunidade/${id_unidade}`);
            setUnidades(prevUnidades => prevUnidades.filter(unidade => unidade.id_unidade !== id_unidade));
        } catch (error) {
            console.error('Erro ao excluir unidade:', error);
        }
    };

    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <div className={EstiloAdmUnidade.contentAdm}>
                <h1 className={EstiloAdmUnidade.titulo}>Unidade</h1>
                <div className={EstiloAdmUnidade.divBtn}>
                    <Botao url={'/cadastro/unidade'} texto={"Nova Unidade +"}/>
                    <p className={EstiloAdmUnidade.qtd}>Quantidade de Unidades: {unidades.length}</p>
                </div>
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
                                        onClick={() => excluirUnidade(unidade.id_unidade)}
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