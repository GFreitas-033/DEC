import React from "react"
import { useNavigate } from "react-router-dom"
import StyleCadastroTurma from "../cadastroDoAdm.module.css"

import Texto from "../../cadastro/textos_cadastro/texto_cadastro"

// Imports dos Inputs
import SelecionarProf from "../../cadastro/inputs_cadastro/inputsTurma/professor_input"
import SelecionarUni from "../../cadastro/inputs_cadastro/inputsTurma/unidade_input"
import QtdMaxima from "../../cadastro/inputs_cadastro/inputsTurma/qtdMaxima_input"
import DiaSemana from "../../cadastro/inputs_cadastro/inputsTurma/diaSemana_input"
import Horario from "../../cadastro/inputs_cadastro/inputsTurma/horario_input"

import Botao from "../../cadastro/botao_cadastro/submit_cadastro"

export default function  Content_cadastro_Turma(props){
    const navigate = useNavigate()

    return(
        <div className={StyleCadastroTurma.ContentC}>
            <h1 className={StyleCadastroTurma.titulo}><Texto text={props.texto}/></h1>

            <form className={StyleCadastroTurma.content} autoComplete="off"> 
                <div className={StyleCadastroTurma.contentInputs}>
                  <SelecionarProf/>
                  <SelecionarUni/>
                  <QtdMaxima/>
                  <DiaSemana/>
                  <Horario/>
                </div>

                <div className={StyleCadastroTurma.divBtn} onClick={()=>navigate(props.url)}>
                    <Botao btn={props.botao} className={StyleCadastroTurma.btn}/>
                </div>
            </form>
        </div>
    )
}