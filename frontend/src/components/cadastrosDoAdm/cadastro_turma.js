import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ContainerCss from "../containers.module.css";
import StyleCadastroTurma from "./cadastroDoAdm.module.css";

import Background_Sistema from "../background/backSistema/backSistema";
import BarraLateral from "../barra_lateral/icons_barra_lateral";
import Notifica from "../sino_notificacao/notificacao";
import BtnVoltar from "../btnVoltar/btnVoltar";

// Imports dos Inputs
import SelecionarProf from "../inputs_cadastro/inputsTurma/professor_input";
import SelecionarUni from "../inputs_cadastro/inputsTurma/unidade_input";
import QtdMaxima from "../inputs_cadastro/inputsTurma/qtdMaxima_input";
import DiaSemana from "../inputs_cadastro/inputsTurma/diaSemana_input";
import Horario from "../inputs_cadastro/inputsTurma/horario_input";
import Nome from "../inputs_cadastro/nome_input";

export default function Cadastro_turma({ texto, btn }){
    const navigate = useNavigate();
    let { id_turma } = useParams();
    const [nome, setNome] = useState("");
    const [unidade, setUnidade] = useState("");
    const [unidades, setUnidades] = useState([]);
    const [professor, setProfessor] = useState("");
    const [professores, setProfessores] = useState([]);
    const [horario, setHorario] = useState("");
    const [qtdmaxima, setQtdMaxima] = useState("");
    const [diasemana, setDiaSemana] = useState("");
    
    const [responseTurma, setResponseTurma] = useState(null);

    useEffect(() => {
        logado();
        fetchUnidades();
        fetchProfessores();
    },[]);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity()) {
            cliquei();
        } else {
            form.reportValidity();
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
        if (id_turma !== undefined) {
          id_turma = parseInt(id_turma);
          preencherDados();
        }
    }, [id_turma]);

    const preencherDados = async () => {
        let responseTurma = await axios.get('/api/turma');
        responseTurma = responseTurma.data;
        responseTurma = responseTurma.find(item => item.id_turma === id_turma);
        setProfessor(responseTurma.id_professor);
        setUnidade(responseTurma.id_unidade);
        setQtdMaxima(responseTurma.qtd_maxima);
        setDiaSemana(responseTurma.dia_semana);
        setHorario(responseTurma.horario);
        setNome(responseTurma.nome_turma);
    }

    async function cliquei() {;
        if (id_turma !== undefined) {
            try {
                let responseTurma = await axios.put(`/api/turma/${id_turma}`, {
                    qtd_maxima: qtdmaxima,
                    id_professor: professor,
                    dia_semana: diasemana,
                    horario: horario,
                    id_unidade: unidade,
                    nome_turma: nome
                });
                setResponseTurma(responseTurma);
            } catch (error) {
                console.log("Erro ao criar turma: ", error);
            }
        }else{
            try {
                let responseTurma = await axios.post('/api/turma/', {
                    qtd_maxima: qtdmaxima,
                    id_professor: professor,
                    dia_semana: diasemana,
                    horario: horario,
                    id_unidade: unidade,
                    nome_turma: nome
                });
                responseTurma = responseTurma.data;
                setResponseTurma(responseTurma);
            } catch (error) {
                console.log("Erro ao criar turma: ", error);
            }
        }
        
    }

    useEffect(() => {
        if (responseTurma) {
            alert("Sucesso!!!");
            preencherDados();
        }
    }, [responseTurma]);

    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={StyleCadastroTurma.content}>
                    <div className={StyleCadastroTurma.textcenter}>
                        <h1>{texto}</h1>
                    </div>
                    <form className={StyleCadastroTurma.form} autoComplete="off" onSubmit={handleSubmit}>
                        <div className={StyleCadastroTurma.contentInputs}>
                            <Nome value={nome} setValue={setNome}/>
                            <SelecionarProf value={professor} setValue={setProfessor} professores={professores}/>
                            <SelecionarUni value={unidade} setValue={setUnidade} unidades={unidades} />
                            <QtdMaxima value={qtdmaxima} setValue={setQtdMaxima}/>
                            <DiaSemana value={diasemana} setValue={setDiaSemana}/>
                            <Horario value={horario} setValue={setHorario}/>
                        </div>
                        <div className={StyleCadastroTurma.divBtn}>
                            <button className={StyleCadastroTurma.btn}>
                                <h1>{btn}</h1>
                            </button>
                        </div>
                    </form>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    )
}