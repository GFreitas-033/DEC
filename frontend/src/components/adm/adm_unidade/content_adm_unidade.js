import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdmUnidade from "../admAPUT.module.css";
import Botao from "../botao_adm/botao_adm";
import Editar from "../../../imgs/icons/Editar.png";
import Excluir from "../../../imgs/icons/Excluir.png";

export default function Content_adm_unidade() {
    const navigate = useNavigate();
    const [unidades, setUnidades] = useState([]);

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

    return (
        <div className={AdmUnidade.contentAdm}>
            <div>
                <h1 className={AdmUnidade.titulo}>Unidade</h1>
            </div>

            <div className={AdmUnidade.divBtn}>
                <Botao url={'/cadastro/unidade'} texto={"Nova Unidade +"}/>
                <p className={AdmUnidade.qtd}>Quantidade de Unidades: {unidades.length}</p>
            </div>
            
            <table className={AdmUnidade.tabela}>
                <thead>
                    <tr>
                        <td className={AdmUnidade.ids}>
                            <p><b><u>ID</u></b></p>
                        </td>
                        <td>
                            <p><b><u>Nome</u></b></p>
                        </td>
                    </tr>
                </thead>

                <tbody>
                    {unidades.map(unidade => (
                        <tr key={unidade.id_unidade}>
                            <td>
                                <div className={AdmUnidade.divIds}>
                                    <p className={AdmUnidade.Id}>{unidade.id_unidade}</p>
                                    <img 
                                        src={Excluir} 
                                        className={AdmUnidade.icon} 
                                        onClick={() => excluirUnidade(unidade.id_unidade)}
                                    />
                                    <img 
                                        src={Editar} 
                                        className={AdmUnidade.icon} 
                                        onClick={() => navigate(`/adm/editar_unidade/${unidade.id_unidade}`)}
                                    />
                                </div>
                            </td>
                            <td className={AdmUnidade.colunaNome}>
                                {unidade.nome_unidade}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
