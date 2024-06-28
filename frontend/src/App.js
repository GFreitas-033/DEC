// Import do React
import React from "react"
import {BrowserRouter as Routers, Routes, Route, Link} from "react-router-dom"
// Import das Telas
import Login from "./components/login/form_login/form"
import Cadastro from "./components/cadastro/form_cadastro/form"
import Home from "./components/home/home"
import Calendario from "./components/calendario/calendario"
import Adm from "./components/adm/adm"
import Alunos from "./components/calendario/aluno_calendario/alunos_calendario"

export default function App(){

  return(
    <Routers>
      {/* Links */}
        <Link to="/"></Link>
        <Link to="/home"></Link>
        <Link to="/cadastro"></Link>
        <Link to="/calendario"></Link>
        <Link to="/adm"></Link>
        <Link to="calendario/alunosCalendario"></Link>
        
      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
        <Route path="/calendario" element={<Calendario />}></Route>
        <Route path="/adm" element={<Adm />}></Route>
        <Route path="calendario/alunosCalendario/:idturma" element={<Alunos />}></Route>
      </Routes>
    </Routers>
  )
}