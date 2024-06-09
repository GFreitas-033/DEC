import React from "react"
import {BrowserRouter as Routers, Routes, Route} from "react-router-dom"
import Login from "./components/login/form/form"
import Home from "./components/home/home"

export default function App(){
  return(
    <Routers>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </Routers>
  )
}