import React from "react"
import Adm from "./adm.module.css"

// Import dos Componentes
import Prof from "./icons_adm/professores_adm"
import Aluno from "./icons_adm/alunos_adm"
import Uni from "./icons_adm/unidade_adm"
import Turma from "./icons_adm/turmas_adm"

export default function content_adm(){
    return(
        <div className={Adm.container_adm}>
            <div className={Adm.display_grid}>
                <Aluno />
                <Prof />
                <Uni />
                <Turma />
            </div>
        </div>
    )
}