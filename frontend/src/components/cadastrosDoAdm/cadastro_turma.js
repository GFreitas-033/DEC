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
import Nome from "../inputs_cadastro/inputsTurma/nome_input";

export default function Cadastro_turma({ texto, btn }){
    const navigate = useNavigate();
    let { id_turma } = useParams();
    const [nome, setNome] = useState("");
    
    const [responseTurma, setResponseTurma] = useState(null);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity()) {
            cliquei();
        } else {
            form.reportValidity();
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
        document.getElementById('SelecaoProfessor').value = responseTurma.id_professor;
        document.getElementById('SelecaoUnidade').value = responseTurma.id_unidade;
        document.getElementById('Maximo').value = responseTurma.qtd_maxima;
        document.getElementById('diaSemana').value = responseTurma.dia_semana;
        document.getElementById('Horario').value = responseTurma.horario;
        document.getElementById('nome').value = responseTurma.nome_turma;
    }

    async function cliquei() {
        const professor = document.getElementById('SelecaoProfessor').value;
        const unidade = document.getElementById('SelecaoUnidade').value;
        const qtdmaxima = document.getElementById('Maximo').value;
        const diasemana = document.getElementById('diaSemana').value;
        const horario = document.getElementById('Horario').value;
        const nome_turma = document.getElementById('nome').value;
        if (id_turma !== undefined) {
            try {
                let responseTurma = await axios.put(`/api/turma/${id_turma}`, {
                    qtd_maxima: qtdmaxima,
                    id_professor: professor,
                    dia_semana: diasemana,
                    horario: horario,
                    id_unidade: unidade,
                    nome_turma: nome_turma
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
                    nome_turma: nome_turma
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
            window.location.reload();
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
                            <SelecionarProf/>
                            <SelecionarUni/>
                            <QtdMaxima/>
                            <DiaSemana/>
                            <Horario/>
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