import React from "react"
import { useNavigate } from "react-router-dom"
import AdmTurma from "../admAPUT.module.css"
import Botao from "../botao_adm/botao_adm"

import Editar from "../../../imgs/Editar.png"
import Excluir from "../../../imgs/Excluir.png"

export default function Content_adm_turma(){
    const navigate = useNavigate()

    return(
        <div className={AdmTurma.contentAdm}>
            <div>
                <h1 className={AdmTurma.titulo}>Turmas</h1>
            </div>

            <div className={AdmTurma.divBtn}>
                <Botao  url={'/cadastro/turma'} texto={"Nova Turma +"} />
                <p className={AdmTurma.qtd}>Quantidade de Turmas: 10</p>
            </div>
            
            <div className={AdmTurma.tabela}>

                <div className={AdmTurma.linhasId}>

                    <ul className={AdmTurma.colunaID}>
                        <li className={AdmTurma.topoTable}><b><u>ID</u></b></li>

                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                    </ul>
                    
                </div>

                <div className={AdmTurma.linhasNome}>
                    <ul>
                        <li className={AdmTurma.topoTable}><b><u>Nome</u></b></li>
                        
                        <li>
                            Samuel
                            <img src={Excluir} className={AdmTurma.icon}/>
                            <img src={Editar} className={AdmTurma.icon} onClick={() => navigate('/adm/editar_turma')}/>
                        </li>

                        <li>
                            André
                            <img src={Excluir} className={AdmTurma.icon}/>
                            <img src={Editar} className={AdmTurma.icon}/>
                        </li>

                        <li>
                            Guilherme L Freitas
                            <img src={Excluir} className={AdmTurma.icon}/>
                            <img src={Editar} className={AdmTurma.icon}/>
                        </li>
                        <li>
                            Alexandre
                            <img src={Excluir} className={AdmTurma.icon}/>
                            <img src={Editar} className={AdmTurma.icon}/>
                        </li>

                        <li>
                            João Pedro Santos
                            <img src={Excluir} className={AdmTurma.icon}/>
                            <img src={Editar} className={AdmTurma.icon}/>
                        </li>
                        {/* Alguns teste */}
                        
                        <li>
                            Teste
                            <img src={Excluir} className={AdmTurma.icon}/>
                            <img src={Editar} className={AdmTurma.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmTurma.icon}/>
                            <img src={Editar} className={AdmTurma.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmTurma.icon}/>
                            <img src={Editar} className={AdmTurma.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmTurma.icon}/>
                            <img src={Editar} className={AdmTurma.icon}/>
                        </li>                        <li>
                            Teste
                            <img src={Excluir} className={AdmTurma.icon}/>
                            <img src={Editar} className={AdmTurma.icon}/>
                        </li>
                        
                    </ul>

                </div>
            </div>
        </div>
    )
}