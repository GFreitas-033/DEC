import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import ContainerCss from "../../containers.module.css";
import EstiloAdmAluno from "./admAPUT.module.css";

import Background_Sistema from "../../background/backSistema/backSistema";
import BarraLateral from "../../barra_lateral/icons_barra_lateral";
import Notifica from "../../sino_notificacao/notificacao";
import BtnVoltar from "../../btnVoltar/btnVoltar";

export default function Adm_aluno(){
    const navigate = useNavigate();
    const [alunos, setAlunos] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [checado1, setCheacado1] = useState(false);
    const [checado2, setCheacado2] = useState(false);
    const [checado3, setCheacado3] = useState(false);

    const alertRemoverAluno = (id_aluno) =>{
        Swal.fire({
            title: "Quer Realmente Excluir esse(a) Aluno(a)?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Excluir Aluno!",
            confirmButtonColor: "#fbd034",
            iconColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        }).then((result) => {
            if (result.isConfirmed) {
                excluirAluno(id_aluno);
            }
        });
    }

    useEffect(() => {
        logado();
        fetchUnidades();
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

    const fetchUnidades = async () => {
        try {
          const response = await axios.get("/api/unidade/");
          const unidadesData = response.data.map((unidade) => ({
            id: unidade.id_unidade,
            nome: unidade.nome_unidade,
          }));
          setUnidades(unidadesData);
        } catch (error) {
          console.error("Erro ao buscar unidades:", error);
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
            Swal.fire({
                title: "Aluno(a) Excluido(a) com Sucesso!",
                icon: "success",
                confirmButtonColor: "#fbd034",
                background: "#2b2b2b",
                theme: "dark"
            });
        } catch (error) {
            console.error('Erro ao excluir aluno:', error);
            Swal.fire({
                title: "Erro ao Excluir Aluno(a)!",
                icon: "success",
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
                <div className={EstiloAdmAluno.contentAdm}>
                    <h1 className={EstiloAdmAluno.titulo}>ALUNOS</h1>
                    {/* Componente Filtro */}
                    <div className={EstiloAdmAluno.divFiltro}>
                        <h1 className={EstiloAdmAluno.textoFiltro}>Filtrar por:</h1>
                        <button className={EstiloAdmAluno.btnFiltro} onClick={()=>{setMostrar(!mostrar)}}>Filtros</button>
                        {mostrar && (
                            <>
                                <div className={EstiloAdmAluno.fundoEscuro} onClick={()=>{setMostrar(!mostrar)}}></div>
                                <div className={EstiloAdmAluno.filtros}>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={checado1}
                                            onChange={()=>{setCheacado1(!checado1)}}
                                        />
                                        <label>
                                            Unidade
                                        </label>
                                        {checado1 && (
                                            <>
                                                <br />
                                                <select className={`${EstiloAdmAluno.inputSelect} 
                                                    ${EstiloAdmAluno.inputGeral}`}>
                                                    <option value="" disabled>Selecionar Unidade</option>
                                                    {unidades.map((unidade) => (
                                                        <option key={unidade.id} value={unidade.id}>
                                                          {unidade.nome}
                                                        </option>
                                                    ))}
                                                </select>
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={checado2}
                                            onChange={()=>{setCheacado2(!checado2)}}
                                        />
                                        <label>
                                            Cidade
                                        </label>
                                        {checado2 && (
                                            <>
                                                <br />
                                                <input type="text"
                                                className={`${EstiloAdmAluno.inputGeral}`} />
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={checado3}
                                            onChange={()=>{setCheacado3(!checado3)}}
                                        />
                                        <label>
                                            Data de Nascimento
                                        </label>
                                        {checado3 && (
                                            <>
                                                <br />
                                                <input type="text"
                                                className={`${EstiloAdmAluno.inputGeral}`} />
                                            </>
                                        )}
                                    </div>
                                    <img src={require('../../../imgs/icons/cancelar.png')} 
                                    className={EstiloAdmAluno.imgFechar}
                                    onClick={()=>{setMostrar(!mostrar)}}/>
                                </div>
                            </>
                        )}
                    </div>
                    {/* Inicio da Tabela */}
                    <table className={EstiloAdmAluno.tabela}>
                        <thead>
                            <tr>
                                <td className={EstiloAdmAluno.colunaId}>
                                    <p><b><u>ID</u></b></p>
                                </td>
                                <td className={EstiloAdmAluno.colunaNome}>
                                    <p><b><u>Nome</u></b></p>
                                </td>
                                <td className={EstiloAdmAluno.colunaAcao}>
                                    <p><b><u>Ação</u></b></p>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.map(aluno => (
                                <tr key={aluno.id_pessoa}>
                                    <td className={EstiloAdmAluno.colunaId}>
                                        {aluno.id_pessoa}
                                    </td>
                                    <td>
                                        {aluno.nome_pessoa}
                                    </td>
                                    <td className={EstiloAdmAluno.colunaAcao}>
                                        <img
                                            src={require('../../../imgs/icons/Editar.png')}
                                            alt="Editar"
                                            className={EstiloAdmAluno.icon}
                                            onClick={() => navigate(`/editar/aluno/${aluno.id_pessoa}`)}
                                        />
                                        <img
                                            src={require('../../../imgs/icons/Excluir.png')}
                                            alt="Excluir"
                                            className={EstiloAdmAluno.icon}
                                            onClick={() => alertRemoverAluno(aluno.id_pessoa)}
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