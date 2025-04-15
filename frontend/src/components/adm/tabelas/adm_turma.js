import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import ContainerCss from "../../containers.module.css";
import EstiloAdmTurma from "./admAPUT.module.css";

import Background_Sistema from "../../background/backSistema/backSistema";
import BarraLateral from "../../barra_lateral/icons_barra_lateral";
import Notifica from "../../sino_notificacao/notificacao";
import BtnVoltar from "../../btnVoltar/btnVoltar";

export default function Adm_turma(){
    const navigate = useNavigate();
    const [turmas, setTurmas] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [checado1, setCheacado1] = useState(false);
    const [checado2, setCheacado2] = useState(false);

    const alertRemoverTurma = (id_turma) =>{
        Swal.fire({
            title: "Quer Realmente Excluir essa Turma?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Excluir Turma!",
            confirmButtonColor: "#fbd034",
            iconColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        }).then((result) => {
            if (result.isConfirmed) {
                excluirTurma(id_turma);
            }
        });
    }

    useEffect(() => {
        logado();
        fetchUnidades();
        fetchProfessores();
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

    const fetchProfessores = async () => {
        try {
          const response = await axios.get("/api/professor/");
          const nomes = response.data.map((prof) => ({
            id: prof.id_pessoa,
            nome: prof.nome_pessoa,
          }));
    
          setProfessores(nomes);
        } catch (error) {
          console.error("Erro ao buscar professores:", error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/turma');
                setTurmas(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados das turmas:', error);
            }
        }
        fetchData();
    }, []);

    const excluirTurma = async (id_turma) => {
        try {
            await axios.get(`/admbackend/excluirturma/${id_turma}`);
            setTurmas(prevTurmas => prevTurmas.filter(turma => turma.id_turma !== id_turma));
            Swal.fire({
                title: "Turma Excluida com Sucesso!",
                icon: "success",
                confirmButtonColor: "#fbd034",
                background: "#2b2b2b",
                theme: "dark"
            });
        } catch (error) {
            console.error('Erro ao excluir turma:', error);
            Swal.fire({
                title: "Erro ao Excluir Turma!",
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
                <div className={EstiloAdmTurma.contentAdm}>
                    <h1 className={EstiloAdmTurma.titulo}>Turmas</h1>
                    {/* Componente Filtro */}
                    <div className={EstiloAdmTurma.divFiltro}>
                        <h1 className={EstiloAdmTurma.textoFiltro}>Filtrar por:</h1>
                        <button className={EstiloAdmTurma.btnFiltro} onClick={()=>{setMostrar(!mostrar)}}>Filtros</button>
                        {mostrar && (
                            <>
                                <div className={EstiloAdmTurma.fundoEscuro} onClick={()=>{setMostrar(!mostrar)}}></div>
                                <div className={EstiloAdmTurma.filtros}>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={checado1}
                                            onChange={()=>{setCheacado1(!checado1)}}
                                        />
                                        <label>
                                            Professor
                                        </label>
                                        {checado1 && (
                                            <>
                                                <br />
                                                <select className={`${EstiloAdmTurma.inputSelect} 
                                                    ${EstiloAdmTurma.inputGeral}`}>
                                                    <option value="" disabled>Selecionar Professor(a)</option>
                                                    {professores.map((professor) => (
                                                        <option key={professor.id} value={professor.id}>
                                                          {professor.nome}
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
                                            Unidade
                                        </label>
                                        {checado2 && (
                                            <>
                                                <br />
                                                <select className={`${EstiloAdmTurma.inputSelect} 
                                                    ${EstiloAdmTurma.inputGeral}`}>
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
                                    <img src={require('../../../imgs/icons/cancelar.png')} 
                                    className={EstiloAdmTurma.imgFechar}
                                    onClick={()=>setMostrar(!mostrar)}/>
                                </div>
                            </>
                        )}
                    </div>
                    {/* Inicio da Tabela */}
                    <table className={EstiloAdmTurma.tabela}>
                        <thead>
                            <tr>
                                <td className={EstiloAdmTurma.colunaId}>
                                    <p><b><u>ID</u></b></p>
                                </td>
                                <td className={EstiloAdmTurma.colunaNome}>
                                    <p><b><u>Nome</u></b></p>
                                </td>
                                <td className={EstiloAdmTurma.colunaAcao}>
                                    <p><b><u>Ação</u></b></p>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {turmas.map(turma => (
                                <tr key={turma.id_turma}>
                                    <td className={EstiloAdmTurma.colunaId}>
                                        {turma.id_turma}
                                    </td>
                                    <td>
                                        {turma.nome_turma}
                                    </td>
                                    <td className={EstiloAdmTurma.colunaAcao}>
                                        <img 
                                            src={require('../../../imgs/icons/Editar.png')}
                                            alt="Editar" 
                                            className={EstiloAdmTurma.icon} 
                                            onClick={() => navigate(`/editar_turma/${turma.id_turma}`)}
                                        />
                                        <img 
                                            src={require('../../../imgs/icons/Excluir.png')}
                                            alt="Excluir" 
                                            className={EstiloAdmTurma.icon} 
                                            onClick={() => alertRemoverTurma(turma.id_turma)}
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