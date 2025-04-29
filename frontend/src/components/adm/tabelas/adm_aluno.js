// src/pages/AdmAluno/index.jsx
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
    const [alunosFiltrados, setAlunosFiltrados] = useState([]);
    const [unidades, setUnidades] = useState([]);

    const [mostrar, setMostrar] = useState(false);
    const [checado1, setChecado1] = useState(false);
    const [checado2, setChecado2] = useState(false);
    const [checado3, setChecado3] = useState(false);
    const [checado4, setChecado4] = useState(false);

    const [filtroUnidade, setFiltroUnidade] = useState("");
    const [filtroCidade, setFiltroCidade] = useState("");
    const [filtroNascimento, setFiltroNascimento] = useState("");

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
    }, []);

    const logado = async () => {
        try {
            let response = await axios.post('/login');
            if(response.data.adm !== 1){
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
                setAlunosFiltrados(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados dos alunos:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        let filtrados = alunos;
        if(filtroUnidade) {
            filtrados = filtrados.filter(aluno => aluno.id_unidade === parseInt(filtroUnidade));
        }
        if(filtroCidade) {
            filtrados = filtrados.filter(aluno => aluno["lower(e.cidade)"].toLowerCase().includes(filtroCidade.toLowerCase()));
        }
        if(filtroNascimento) {
            filtrados = filtrados.filter(aluno => aluno.dt_nasc_pessoa.substring(0,4) === filtroNascimento);
        }
        setAlunosFiltrados(filtrados);
    }, [filtroUnidade, filtroCidade, filtroNascimento, alunos]);

    const excluirAluno = async (id_aluno) => {
        try {
            await axios.get(`/admbackend/excluiraluno/${id_aluno}`);
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
                <div className={EstiloAdmAluno.contentAdm}>
                    <h1 className={EstiloAdmAluno.titulo}>ALUNOS</h1>
                    <div className={EstiloAdmAluno.divFiltro}>
                        <h1 className={EstiloAdmAluno.textoFiltro}>Filtrar por:</h1>
                        <button className={EstiloAdmAluno.btnFiltro} onClick={()=>{setMostrar(!mostrar)}}>Filtros</button>
                        {mostrar && (
                            <>
                                <div className={EstiloAdmAluno.fundoEscuro} onClick={()=>{setMostrar(!mostrar)}}></div>
                                <div className={EstiloAdmAluno.filtros}>
                                    <div>
                                        <input type="checkbox" checked={checado1} onChange={handleCheckboxChange(setChecado1, setFiltroUnidade)} />
                                        <label>Unidade</label>
                                        {checado1 && (
                                            <>
                                                <br />
                                                <select className={`${EstiloAdmAluno.inputSelect} ${EstiloAdmAluno.inputGeral}`} onChange={(e)=>setFiltroUnidade(e.target.value)}>
                                                    <option value="">Selecionar Unidade</option>
                                                    {unidades.map((unidade) => (
                                                        <option key={unidade.id} value={unidade.id}>{unidade.nome}</option>
                                                    ))}
                                                </select>
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        <input type="checkbox" checked={checado2} onChange={handleCheckboxChange(setChecado2, setFiltroCidade)} />
                                        <label>Cidade</label>
                                        {checado2 && (
                                            <>
                                                <br />
                                                <input type="text" className={`${EstiloAdmAluno.inputGeral} ${EstiloAdmAluno.inputTexto}`} onChange={(e)=>setFiltroCidade(e.target.value)} />
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        <input type="checkbox" checked={checado3} onChange={handleCheckboxChange(setChecado3, setFiltroNascimento)} />
                                        <label>Ano de Nascimento</label>
                                        {checado3 && (
                                            <>
                                                <br />
                                                <input type="text" placeholder="Ano de Nascimento" className={`${EstiloAdmAluno.inputGeral} ${EstiloAdmAluno.inputTexto}`} onChange={(e)=>setFiltroNascimento(e.target.value)} />
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        <input type="checkbox" checked={checado4} onChange={handleCheckboxChange(setChecado4, setFiltroNascimento)} />
                                        <label>Tipo de Aluno</label>
                                        {checado4 && (
                                            <>
                                                <br />
                                                <select className={`${EstiloAdmAluno.inputSelect} ${EstiloAdmAluno.inputGeral}`}>
                                                    <option value="">Selecionar</option>
                                                    <option>Pagante</option>
                                                    <option>Não Pagante</option>
                                                    <option>Escola</option>
                                                </select>
                                            </>
                                        )}
                                    </div>
                                    <img src={require('../../../imgs/icons/cancelar.png')} className={EstiloAdmAluno.imgFechar} onClick={()=>{setMostrar(!mostrar)}} />
                                </div>
                            </>
                        )}
                    </div>

                    <table className={EstiloAdmAluno.tabela}>
                        <thead>
                            <tr>
                                <td className={EstiloAdmAluno.colunaId}><p><b><u>ID</u></b></p></td>
                                <td className={EstiloAdmAluno.colunaNome}><p><b><u>Nome</u></b></p></td>
                                <td className={EstiloAdmAluno.colunaAcao}><p><b><u>Ação</u></b></p></td>
                            </tr>
                        </thead>
                        <tbody>
                            {alunosFiltrados.map(aluno => (
                                <tr key={aluno.id_pessoa}>
                                    <td className={EstiloAdmAluno.colunaId}>{aluno.id_pessoa}</td>
                                    <td>{aluno.nome_pessoa}</td>
                                    <td className={EstiloAdmAluno.colunaAcao}>
                                        <img src={require('../../../imgs/icons/Editar.png')} alt="Editar" className={EstiloAdmAluno.icon} onClick={() => navigate(`/editar/aluno/${aluno.id_pessoa}`)} />
                                        <img src={require('../../../imgs/icons/Excluir.png')} alt="Excluir" className={EstiloAdmAluno.icon} onClick={() => alertRemoverAluno(aluno.id_pessoa)} />
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