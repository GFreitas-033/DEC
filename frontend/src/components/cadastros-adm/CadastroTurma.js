import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import ContainerCss from "../containers.module.css";
import StyleCadastroTurma from "./cadastroDoAdm.module.css";

import BackgroundSistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

// Imports dos Inputs
import SelecionarProf from "../inputs-cadastro/inputs-turma/Professor";
import SelecionarUni from "../inputs-cadastro/inputs-turma/Unidade";
import QtdMaxima from "../inputs-cadastro/inputs-turma/QtdMaxima";
import DiaSemana from "../inputs-cadastro/inputs-turma/DiaSemana";
import Horario from "../inputs-cadastro/inputs-turma/Horario";
import Nome from "../inputs-cadastro/Nome";

export default function Cadastro_turma({ texto, btn }) {
    let { id_turma } = useParams();
    const [nome, setNome] = useState("");
    const [unidade, setUnidade] = useState("");
    const [unidades, setUnidades] = useState([]);
    const [professor, setProfessor] = useState("");
    const [professores, setProfessores] = useState([]);
    const [horarioI, setHorarioI] = useState("");
    const [horarioF, setHorarioF] = useState("");
    const [qtdmaxima, setQtdMaxima] = useState("");
    const [diasemana, setDiaSemana] = useState("");

    const [responseTurma, setResponseTurma] = useState(null);

    const alertErroCadastro = () => {
        Swal.fire({
            title: "Não foi possível Cadastrar a Turma.",
            icon: "error",
            confirmButtonColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        })
    };
    const alertSucessoCadastro = () => {
        Swal.fire({
            title: "Turma Cadastrada com Sucesso.",
            icon: "success",
            confirmButtonColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        })
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

    const preencherDados = useCallback(async () => {
        let responseTurma = await axios.get('/api/turma');
        responseTurma = responseTurma.data;
        responseTurma = responseTurma.find(item => item.id_turma === id_turma);
        if (!responseTurma) return;
        setProfessor(responseTurma.id_professor);
        setUnidade(responseTurma.id_unidade);
        setQtdMaxima(responseTurma.qtd_maxima);
        setDiaSemana(responseTurma.dia_semana);
        setHorarioI(responseTurma.horario);
        setHorarioF(responseTurma.horario_final);
        setNome(responseTurma.nome_turma);
    }, [id_turma])

    async function cliquei() {
        if (id_turma !== undefined) {
            try {
                let responseTurma = await axios.put(`/api/turma/${id_turma}`, {
                    qtd_maxima: qtdmaxima,
                    id_professor: professor,
                    dia_semana: diasemana,
                    horario: horarioI,
                    horario_final: horarioF,
                    id_unidade: unidade,
                    nome_turma: nome
                });
                setResponseTurma(responseTurma);
            } catch (error) {
                console.log("Erro ao criar turma: ", error);
            }
        } else {
            try {
                let responseTurma = await axios.post('/api/turma/', {
                    qtd_maxima: qtdmaxima,
                    id_professor: professor,
                    dia_semana: diasemana,
                    horario: horarioI,
                    horario_final: horarioF,
                    id_unidade: unidade,
                    nome_turma: nome
                });
                responseTurma = responseTurma.data;
                setResponseTurma(responseTurma);
            } catch (error) {
                console.log("Erro ao criar turma: ", error);
                alertErroCadastro();
            }
        }
    }

    useEffect(() => {
        fetchUnidades();
        fetchProfessores();
    }, []);

    useEffect(() => {
        if (id_turma !== undefined) {
            const id = parseInt(id_turma);
            preencherDados(id);
        }
    }, [id_turma, preencherDados]);

    useEffect(() => {
        if (responseTurma) {
            alertSucessoCadastro();
            if (id_turma !== undefined) {
                preencherDados(parseInt(id_turma));
            }
        }
    }, [responseTurma, id_turma, preencherDados]);

    return (
        <div>
            <BackgroundSistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={StyleCadastroTurma.content}>
                    <div className={StyleCadastroTurma.textcenter}>
                        <h1>{texto}</h1>
                    </div>
                    <form className={StyleCadastroTurma.form} autoComplete="off" onSubmit={handleSubmit}>
                        <div className={StyleCadastroTurma.contentInputs}>
                            <Nome value={nome} setValue={setNome} />
                            <SelecionarProf value={professor} setValue={setProfessor} professores={professores} />
                            <SelecionarUni value={unidade} setValue={setUnidade} unidades={unidades} />
                            <QtdMaxima value={qtdmaxima} setValue={setQtdMaxima} />
                            <DiaSemana value={diasemana} setValue={setDiaSemana} />
                            <Horario value={horarioI} setValue={setHorarioI} texto={"Início"} />
                            <Horario value={horarioF} setValue={setHorarioF} texto={"Final"} />
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