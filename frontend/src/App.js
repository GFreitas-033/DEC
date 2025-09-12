// Import do React
import React from "react"
import {BrowserRouter as Routers, Routes, Route} from "react-router-dom"

// Import das Telas
import Login from "./components/login/Form"
import PaganteTrue from "./components/cadastro/PaganteTrue"
import PaganteFalse from "./components/cadastro/PaganteFalse"
import AlunoEscola from "./components/cadastro/Escola"

import CadastroProf from "./components/cadastros-adm/CadastroProf"
import CadastroUnidade from "./components/cadastros-adm/CadastroUnidade"
import CadastroTurma from "./components/cadastros-adm/CadastroTurma"

import Home from "./components/home/Home"

import Calendario from "./components/calendario/Calendario"
import Alunos from "./components/calendario/aluno-calendario/AlunosCalendario"
import Chamada from "./components/calendario/chamada/Chamada"

import Adm from "./components/adm/Adm"

import Dashboard from "./components/dashboard/Dashboard"

import AdmAluno from "./components/adm/tabelas/AdmAluno"
import AdmResp from "./components/adm/tabelas/AdmResponsaveis"
import AdmProf from "./components/adm/tabelas/AdmProfessor"
import AdmUni from "./components/adm/tabelas/AdmUnidade"
import AdmTurma from "./components/adm/tabelas/AdmTurma"

import InfoAluno from "./components/info-aluno/InfoAlulo"

import Disponibilidade from "./components/disponibilidade-professor/Disponibilidade"

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
        <Route path="aulas/chamada/:idturma" element={<Chamada />}></Route>

        <Route path="/adm" element={<Adm />}></Route>

        <Route path="/adm/dashboard" element={<Dashboard />}></Route>
        
        <Route path="adm/adm_aluno" element={<AdmAluno />}></Route>

        <Route path="adm/adm_responsavel" element={<AdmResp />}></Route>
        <Route path="/editar_responsavel/:id_responsavel" element={<CadastroTurma texto={"Editar Turma"} btn={"Editar"}/>}></Route>
        <Route path="/adm/InformaçõesDoResponsavel/:id_responsavel" element={<InfoAluno />}></Route>

        <Route path="/adm/InformaçõesDoAluno/:id_aluno" element={<InfoAluno />}></Route>

        <Route path="adm/adm_prof/disponibilidade" element={<Disponibilidade />}></Route>
      </Routes>
    </Routers>
  )
}