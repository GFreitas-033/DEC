import React from "react"
import AdmAluno from "../admAPUT.module.css"
import Botao from "../botao_adm/botao_adm"

import Editar from "../../../imgs/Editar.png"
import Excluir from "../../../imgs/Excluir.png"

export default function content_adm_aluno(){
    return(
        <div className={AdmAluno.contentAdm}>
            <div>
                <h1 className={AdmAluno.titulo}>ALUNOS</h1>
            </div>

            <div className={AdmAluno.divBtn}>
                <p className={AdmAluno.qtd}>Quantidade de Alunos: 10</p>
            </div>
            
            <div className={AdmAluno.tabela}>

                <div className={AdmAluno.linhasId}>

                    <ul className={AdmAluno.colunaID}>
                        <li className={AdmAluno.topoTable}><b><u>ID</u></b></li>

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

                <div className={AdmAluno.linhasNome}>
                    <ul>
                        <li className={AdmAluno.topoTable}><b><u>Nome</u></b></li>
                        
                        <li>
                            Samuel
                            <img src={Excluir} className={AdmAluno.icon}/>
                            <img src={Editar} className={AdmAluno.icon}/>
                        </li>

                        <li>
                            André
                            <img src={Excluir} className={AdmAluno.icon}/>
                            <img src={Editar} className={AdmAluno.icon}/>
                        </li>

                        <li>
                            Guilherme L Freitas
                            <img src={Excluir} className={AdmAluno.icon}/>
                            <img src={Editar} className={AdmAluno.icon}/>
                        </li>
                        <li>
                            Alexandre
                            <img src={Excluir} className={AdmAluno.icon}/>
                            <img src={Editar} className={AdmAluno.icon}/>
                        </li>

                        <li>
                            João Pedro Santos
                            <img src={Excluir} className={AdmAluno.icon}/>
                            <img src={Editar} className={AdmAluno.icon}/>
                        </li>
                        {/* Alguns teste */}
                        
                        <li>
                            Teste
                            <img src={Excluir} className={AdmAluno.icon}/>
                            <img src={Editar} className={AdmAluno.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmAluno.icon}/>
                            <img src={Editar} className={AdmAluno.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmAluno.icon}/>
                            <img src={Editar} className={AdmAluno.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmAluno.icon}/>
                            <img src={Editar} className={AdmAluno.icon}/>
                        </li>                        <li>
                            Teste
                            <img src={Excluir} className={AdmAluno.icon}/>
                            <img src={Editar} className={AdmAluno.icon}/>
                        </li>
                        
                    </ul>

                </div>
            </div>
        </div>
    )
}