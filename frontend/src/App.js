// Import do React
import React from "react"
import {BrowserRouter as Routers, Routes, Route} from "react-router-dom"

// Import das Telas
import Login from "./components/login/form"
import PaganteTrue from "./components/cadastro/paganteTrue"
import PaganteFalse from "./components/cadastro/paganteFalse"
import AlunoEscola from "./components/cadastro/Escola"

import CadastroProf from "./components/cadastrosDoAdm/cadastro_prof"
import CadastroUnidade from "./components/cadastrosDoAdm/cadastro_unidade"
import CadastroTurma from "./components/cadastrosDoAdm/cadastro_turma"

import Home from "./components/home/home"

import Calendario from "./components/calendario/calendario"
import Alunos from "./components/calendario/aluno_calendario/alunos_calendario"
import Chamada from "./components/calendario/chamada/chamada"

import Adm from "./components/adm/adm"

import AdmAluno from "./components/adm/tabelas/adm_aluno"
import AdmProf from "./components/adm/tabelas/adm_professor"
import AdmUni from "./components/adm/tabelas/adm_unidade"
import AdmTurma from "./components/adm/tabelas/adm_turma"

export default function App(){

  return(
    <Routers>
      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="/home" element={<Home/>}></Route>

        <Route path="/editar/aluno/:id_aluno" element={<PaganteTrue />}></Route>
        <Route path="/matricula" element={<PaganteTrue />}></Route>{/* Aluno Pagante */}
        <Route path="/cadastro" element={<PaganteFalse />}></Route>{/* Aluno Não Pagante */}
        <Route path="/cadastro/aluno/Escola" element={<AlunoEscola />}></Route>{/* Aluno de Escola */}
        
        <Route path="adm/adm_prof" element={<AdmProf />}></Route>
        <Route path="/cadastro/professor" element={<CadastroProf texto={"Cadastro de Professores"} btn={"Cadastrar"}/>}></Route>
        <Route path="/editar_prof/:id_professor" element={<CadastroProf texto={"Editar Professor"} btn={"Editar"}/>}></Route>
        
        <Route path="adm/adm_unidade" element={<AdmUni />}></Route>
        <Route path="/cadastro/unidade" element={<CadastroUnidade texto={"Cadastro de Unidade"} btn={"Cadastrar"}/>}></Route>
        <Route path="/editar_unidade/:id_unidade" element={<CadastroUnidade texto={"Editar Unidade"} btn={"Editar"}/>}></Route>
        
        <Route path="adm/adm_turmas" element={<AdmTurma />}></Route>
        <Route path="/cadastro/turma" element={<CadastroTurma texto={"Cadastro de Turmas"} btn={"Cadastrar"}/>}></Route>
        <Route path="/editar_turma/:id_turma" element={<CadastroTurma texto={"Editar Turma"} btn={"Editar"}/>}></Route>

        <Route path="/aulas" element={<Calendario />}></Route>
        <Route path="aulas/turma/:idturma" element={<Alunos />}></Route>
        <Route path="aulas/chamada" element={<Chamada />}></Route>

        <Route path="/adm" element={<Adm />}></Route>
        
        <Route path="adm/adm_aluno" element={<AdmAluno />}></Route>
      </Routes>
    </Routers>
  )
}