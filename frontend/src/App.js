// Import do React
import React from "react"
import {BrowserRouter as Routers, Routes, Route, Link} from "react-router-dom"
// Import das Telas
import Login from "./components/login/form_login/form"
import Cadastro from "./components/cadastro/form_cadastro/form"
import CadastroResponsavel from "./components/cadastroResponsavel/cadastroResponsavel"
import CadastroProf from "./components/cadastro_prof/cadastro_prof"

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
        <Link to="/cadastro"></Link>
        <Link to="/cadastro/responsavel"></Link>
        <Link to="/cadastro/professor"></Link>

        <Link to="/home"></Link>

        <Link to="/calendario"></Link>
        <Link to="calendario/alunosCalendario"></Link>

        <Link to="/adm"></Link>
  
        <Link to="adm/adm_aluno"></Link>
        <Link to="adm/editar_aluno"></Link>

        <Link to="adm/adm_prof"></Link>
        <Link to="adm/adm_unidade"></Link>
        <Link to="adm/adm_turmas"></Link>
        
      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/cadastro" element={<Cadastro texto={"Cadastro"} botao={"Cadastrar"}/>}></Route>
        <Route path="/cadastro/responsavel" element={<CadastroResponsavel texto={"Cadastro"} botao={"Cadastrar"}/>}></Route>
        <Route path="/cadastro/professor" element={<CadastroProf />}></Route>

        <Route path="/home" element={<Home/>}></Route>

        <Route path="/calendario" element={<Calendario />}></Route>
        <Route path="calendario/alunosCalendario/:idturma" element={<Alunos />}></Route>

        <Route path="/adm" element={<Adm />}></Route>
        
        <Route path="adm/adm_aluno" element={<AdmAluno />}></Route>
        <Route path="adm/editar_aluno" element={<Cadastro texto={"Editar"}  botao={"Editar"}/>}></Route>

        <Route path="adm/adm_prof" element={<AdmProf />}></Route>
        <Route path="adm/adm_unidade" element={<AdmUni />}></Route>
        <Route path="adm/adm_turmas" element={<AdmTurma />}></Route>
      </Routes>
    </Routers>
  )
}