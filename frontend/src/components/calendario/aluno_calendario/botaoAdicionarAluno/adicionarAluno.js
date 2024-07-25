import React from "react"
import btnStyle from "./adiciona_Aluno.module.css"

export default function Adicionar_Aluno(){
    return(
        <div>
            <select name="diaSemana" className={btnStyle.selectInput}>
                <option value="" selected disabled>Selecionar</option>
                <option value="Segunda">Segunda</option>
                <option value="Terça">Terça</option>
                <option value="Quarta">Quarta</option>
                <option value="Quinta">Quinta</option>
                <option value="Sexta">Sexta</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
            </select>
            <button className={btnStyle.btnAdicionaAluno}>
                Adicionar Aluno +
            </button>
        </div>
    )
}