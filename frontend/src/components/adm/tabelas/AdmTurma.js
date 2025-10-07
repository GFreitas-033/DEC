// src/pages/AdmTurma/index.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import ContainerCss from "../../containers.module.css";
import EstiloAdmTurma from "./admAPUT.module.css";

import Background_Sistema from "../../background/BackSistema";
import BarraLateral from "../../barra-lateral/BarraLateral";
import Notifica from "../../sino-notificacao/Notificacao";
import BtnVoltar from "../../btn-voltar/BotaoVoltar";

export default function Adm_turma(){
    const navigate = useNavigate();
    const [turmas, setTurmas] = useState([]);
    const [turmasFiltradas, setTurmasFiltradas] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [professores, setProfessores] = useState([]);

    const [mostrar, setMostrar] = useState(false);
    const [checado1, setChecado1] = useState(false);
    const [checado2, setChecado2] = useState(false);
    const [checado3, setChecado3] = useState(false);

    const [filtroProfessor, setFiltroProfessor] = useState("");
    const [filtroUnidade, setFiltroUnidade] = useState("");
    const [filtroTurmaNome, setFiltroTurmaNome] = useState("");

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
    }, []);

    const logado = async () => {
        try {
            let response = await axios.post('/login');
            if(response.data.adm!==1){
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
                const response = await axios.get('/api/turma/padrao-completa');
                setTurmas(response.data);
                setTurmasFiltradas(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados das turmas:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        let filtradas = turmas;
        if(filtroProfessor) {
            filtradas = filtradas.filter(turma => turma.id_professor === parseInt(filtroProfessor));
        }
        if(filtroUnidade) {
            filtradas = filtradas.filter(turma => turma.id_unidade === parseInt(filtroUnidade));
        }
        if(filtroTurmaNome) {
            filtradas = filtradas.filter(turma => turma.nome_turma.toLowerCase().includes(filtroTurmaNome.toLowerCase()));
        }
        setTurmasFiltradas(filtradas);
    }, [filtroProfessor, filtroUnidade, filtroTurmaNome, turmas]);

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

    const handleCheckboxChange = (checkboxSetter, filtroSetter) => (e) => {
        const checked = e.target.checked;
        checkboxSetter(checked);
        if (!checked) filtroSetter("");
    };

    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloAdmTurma.contentAdm}>
                    <h1 className={EstiloAdmTurma.titulo}>Turmas</h1>
                    <div className={EstiloAdmTurma.divFiltro}>
                        <h1 className={EstiloAdmTurma.textoFiltro}>Filtrar por:</h1>
                        <button className={EstiloAdmTurma.btnFiltro} onClick={()=>{setMostrar(!mostrar)}}>Filtros</button>
                        {mostrar && (
                            <>
                                <div className={EstiloAdmTurma.fundoEscuro} onClick={()=>{setMostrar(!mostrar)}}></div>
                                <div className={EstiloAdmTurma.filtros}>
                                    <div>
                                        <input type="checkbox" checked={checado1} onChange={handleCheckboxChange(setChecado1, setFiltroProfessor)} />
                                        <label>Professor</label>
                                        {checado1 && (
                                            <>
                                                <br />
                                                <select className={`${EstiloAdmTurma.inputSelect} ${EstiloAdmTurma.inputGeral}`} onChange={(e)=>setFiltroProfessor(e.target.value)}>
                                                    <option value="">Selecionar Professor(a)</option>
                                                    {professores.map((professor) => (
                                                        <option key={professor.id} value={professor.id}>{professor.nome}</option>
                                                    ))}
                                                </select>
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        <input type="checkbox" checked={checado2} onChange={handleCheckboxChange(setChecado2, setFiltroUnidade)} />
                                        <label>Unidade</label>
                                        {checado2 && (
                                            <>
                                                <br />
                                                <select className={`${EstiloAdmTurma.inputSelect} ${EstiloAdmTurma.inputGeral}`} onChange={(e)=>setFiltroUnidade(e.target.value)}>
                                                    <option value="">Selecionar Unidade</option>
                                                    {unidades.map((unidade) => (
                                                        <option key={unidade.id} value={unidade.id}>{unidade.nome}</option>
                                                    ))}
                                                </select>
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        <input type="checkbox" checked={checado3} onChange={handleCheckboxChange(setChecado3, setFiltroTurmaNome)} />
                                        <label>Nome</label>
                                        {checado3 && (
                                            <>
                                                <br />
                                                <input type="text" placeholder="Nome da Turma" 
                                                className={`${EstiloAdmTurma.inputGeral} ${EstiloAdmTurma.inputTexto}`} 
                                                onChange={(e) => setFiltroTurmaNome(e.target.value)} 
                                                value={filtroTurmaNome} />
                                            </>
                                        )}
                                    </div>
                                    <img src={require('../../../imgs/icons/cancelar.png')} className={EstiloAdmTurma.imgFechar} onClick={()=>setMostrar(!mostrar)} />
                                </div>
                            </>
                        )}
                    </div>
                    <table className={EstiloAdmTurma.tabela}>
                        <thead>
                            <tr>
                                <td className={EstiloAdmTurma.colunaId}><p><b><u>ID</u></b></p></td>
                                <td className={EstiloAdmTurma.colunaNome}><p><b><u>Nome</u></b></p></td>
                                <td className={EstiloAdmTurma.colunaAcao}><p><b><u>Ação</u></b></p></td>
                            </tr>
                        </thead>
                        <tbody>
                            {turmasFiltradas.map((turma, index) => (
                                <tr key={`${turma.id_pessoa}-${index}`}>
                                    <td className={EstiloAdmTurma.colunaId}>{turma.id_turma}</td>
                                    <td>{turma.nome_turma}</td>
                                    <td className={EstiloAdmTurma.colunaAcao}>
                                        <img src={require('../../../imgs/icons/Editar.png')} alt="Editar" className={EstiloAdmTurma.icon} onClick={() => navigate(`/editar_turma/${turma.id_turma}`)} />
                                        <img src={require('../../../imgs/icons/Excluir.png')} alt="Excluir" className={EstiloAdmTurma.icon} onClick={() => alertRemoverTurma(turma.id_turma)} />
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