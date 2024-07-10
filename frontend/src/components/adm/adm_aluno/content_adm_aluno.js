import React from "react"
import AdmAluno from "./admAluno.module.css"

export default function content_adm_aluno(){
    return(
        <div className={AdmAluno.contentAdmAluno}>
            <div className={AdmAluno.divTitulo}>
                <h1 className={AdmAluno.titulo}>ALUNOS</h1>
            </div>

            <div className={AdmAluno.tabela}>
                <div className={AdmAluno.linhas}>
                    <ul className={AdmAluno.colunaID}>
                        <li className={AdmAluno.topoTable}><b><u>ID</u></b></li>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
                <div className={AdmAluno.linhas}>
                    <ul>
                        <li className={AdmAluno.topoTable}><b><u>Nome</u></b></li>
                        <li>Samuel</li>
                        <li>André</li>
                        <li>Teste</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}