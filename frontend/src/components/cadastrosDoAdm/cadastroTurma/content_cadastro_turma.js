import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StyleCadastroTurma from "../cadastroDoAdm.module.css";
import axios from "axios";

import Texto from "../textos_cadastro/texto_cadastro";

// Imports dos Inputs
import SelecionarProf from "../../inputs_cadastro/inputsTurma/professor_input";
import SelecionarUni from "../../inputs_cadastro/inputsTurma/unidade_input";
import QtdMaxima from "../../inputs_cadastro/inputsTurma/qtdMaxima_input";
import DiaSemana from "../../inputs_cadastro/inputsTurma/diaSemana_input";
import Horario from "../../inputs_cadastro/inputsTurma/horario_input";
import Nome from "../../inputs_cadastro/inputsTurma/nome_input";

import Botao from "../botao_cadastro/submit_cadastro";

export default function Content_cadastro_Turma(props) {
    const navigate = useNavigate();
    let { id_turma } = useParams();
    const [nome, setNome] = useState("");
    
    const [responseTurma, setResponseTurma] = useState(null);

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

    return (
        <div className={StyleCadastroTurma.ContentC}>
            <h1 className={StyleCadastroTurma.titulo}><Texto text={props.texto} /></h1>

            <form className={StyleCadastroTurma.content} autoComplete="off" onSubmit={handleSubmit}>
                <div className={StyleCadastroTurma.contentInputs}>
                    <Nome value={nome} setValue={setNome}/>
                    <SelecionarProf/>
                    <SelecionarUni/>
                    <QtdMaxima/>
                    <DiaSemana/>
                    <Horario/>
                </div>

                <div className={StyleCadastroTurma.divBtn}>
                    <Botao btn={props.botao} onClick={handleSubmit} className={StyleCadastroTurma.btn} />
                </div>
            </form>
        </div>
    );
}
