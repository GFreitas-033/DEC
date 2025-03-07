// Import do React
import React from "react"
import {BrowserRouter as Routers, Routes, Route, Link} from "react-router-dom"

// Import das Telas
import Login from "./components/login/form"
import PaganteTrue from "./components/cadastro/paganteTrue"
import PaganteFalse from "./components/cadastro/paganteFalse"
import AlunoEscola from "./components/cadastro/Escola"

import CadastroProf from "./components/cadastrosDoAdm/cadastroProf/cadastro_prof"
import CadastroUnidade from "./components/cadastrosDoAdm/cadastroUnidade/cadastro_unidade"
import CadastroTurma from "./components/cadastrosDoAdm/cadastroTurma/cadastro_turma"

import Home from "./components/home/home"

import Calendario from "./components/calendario/calendario"
import Alunos from "./components/calendario/aluno_calendario/alunos_calendario"

import Adm from "./components/adm/adm"

import AdmAluno from "./components/adm/adm_aluno/adm_aluno"
import AdmProf from "./components/adm/adm_professor/adm_professor"
import AdmUni from "./components/adm/adm_unidade/adm_unidade"
import AdmTurma from "./components/adm/adm_turma/adm_turma"

export default function App(){

  return(
    <Routers>
      {/* Links */}
        <Link to="/"></Link>

        <Link to="/cadastro/aluno/Pagante"></Link>
        <Link to="/cadastro/aluno/NaoPagante"></Link>
        <Link to="/cadastro/aluno/Escola"></Link>

        <Link to="/editar/aluno/Pagante"></Link>
        <Link to="/editar/aluno/NaoPagante"></Link>
        <Link to="/editar/aluno/Escola"></Link>

        <Link to="/cadastro/professor"></Link>
        <Link to="/cadastro/unidade"></Link>
        <Link to="/cadastro/unidade/responsavel"></Link>
        <Link to="/cadastro/turma"></Link>

        <Link to="/home"></Link>

        <Link to="/aulas"></Link>
        <Link to="aulas/alunos_aulas"></Link>

        <Link to="/adm"></Link>
  
        <Link to="adm/adm_aluno"></Link>

        <Link to="adm/adm_prof"></Link>
        <Link to="adm/editar_prof"></Link>

        <Link to="adm/adm_unidade"></Link>
        <Link to="adm/editar_unidade"></Link>
        <Link to="adm/editar_res-unidade"></Link>

        <Link to="adm/adm_turmas"></Link>
        <Link to="adm/editar_turma"></Link>
        
      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="/home" element={<Home/>}></Route>

        <Route path="/cadastro/aluno/Pagante" element={<PaganteTrue />}></Route>
        <Route path="/editar/aluno/Pagante" element={<PaganteTrue />}></Route>

        <Route path="/cadastro/aluno/NaoPagante" element={<PaganteFalse />}></Route>
        <Route path="/editar/aluno/NaoPagante" element={<PaganteFalse />}></Route>

        <Route path="/cadastro/aluno/Escola" element={<AlunoEscola />}></Route>
        <Route path="/editar/aluno/Escola" element={<AlunoEscola />}></Route>
        
        <Route path="adm/adm_prof" element={<AdmProf />}></Route>
        <Route path="/cadastro/professor" element={<CadastroProf texto={"Cadastro de Professores"} btn={"Cadastrar"}/>}></Route>
        <Route path="adm/editar_prof/:id_professor" element={<CadastroProf texto={"Editar Professor"} btn={"Editar"}/>}></Route>
        
        <Route path="adm/adm_unidade" element={<AdmUni />}></Route>
        <Route path="/cadastro/unidade" element={<CadastroUnidade texto={"Cadastro de Unidade"} btn={"Cadastrar"}/>}></Route>
        <Route path="adm/editar_unidade/:id_unidade" element={<CadastroUnidade texto={"Editar Unidade"} btn={"Editar"}/>}></Route>
        
        <Route path="adm/adm_turmas" element={<AdmTurma />}></Route>
        <Route path="/cadastro/turma" element={<CadastroTurma texto={"Cadastro de Turmas"} btn={"Cadastrar"}/>}></Route>
        <Route path="adm/editar_turma/:id_turma" element={<CadastroTurma texto={"Editar Turma"} btn={"Editar"}/>}></Route>

        <Route path="/aulas" element={<Calendario />}></Route>
        <Route path="aulas/alunos_aulas/:idturma" element={<Alunos />}></Route>

        <Route path="/adm" element={<Adm />}></Route>
        
        <Route path="adm/adm_aluno" element={<AdmAluno />}></Route>
      </Routes>
    </Routers>
  )
}