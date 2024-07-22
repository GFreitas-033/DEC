import React from "react"
import { useNavigate } from "react-router-dom"
import AdmUnidade from "../admAPUT.module.css"
import Botao from "../botao_adm/botao_adm"

import Editar from "../../../imgs/Editar.png"
import Excluir from "../../../imgs/Excluir.png"

export default function Content_adm_unidade(){
    const navigate = useNavigate()

    return(
        <div className={AdmUnidade.contentAdm}>
            <div>
                <h1 className={AdmUnidade.titulo}>Unidade</h1>
            </div>

            <div className={AdmUnidade.divBtn}>
                <Botao url={'/cadastro/unidade'} texto={"Nova Unidade +"}/>
                <p className={AdmUnidade.qtd}>Quantidade de Unidade: 10</p>
            </div>
            
            <div className={AdmUnidade.tabela}>

                <div className={AdmUnidade.linhasId}>

                    <ul className={AdmUnidade.colunaID}>
                        <li className={AdmUnidade.topoTable}><b><u>ID</u></b></li>

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

                <div className={AdmUnidade.linhasNome}>
                    <ul>
                        <li className={AdmUnidade.topoTable}><b><u>Nome</u></b></li>
                        
                        <li>
                            Samuel
                            <img src={Excluir} className={AdmUnidade.icon}/>
                            <img src={Editar} className={AdmUnidade.icon} onClick={() => navigate('/adm/editar_unidade')}/>
                        </li>

                        <li>
                            André
                            <img src={Excluir} className={AdmUnidade.icon}/>
                            <img src={Editar} className={AdmUnidade.icon}/>
                        </li>

                        <li>
                            Guilherme L Freitas
                            <img src={Excluir} className={AdmUnidade.icon}/>
                            <img src={Editar} className={AdmUnidade.icon}/>
                        </li>
                        <li>
                            Alexandre
                            <img src={Excluir} className={AdmUnidade.icon}/>
                            <img src={Editar} className={AdmUnidade.icon}/>
                        </li>

                        <li>
                            João Pedro Santos
                            <img src={Excluir} className={AdmUnidade.icon}/>
                            <img src={Editar} className={AdmUnidade.icon}/>
                        </li>
                        {/* Alguns teste */}
                        
                        <li>
                            Teste
                            <img src={Excluir} className={AdmUnidade.icon}/>
                            <img src={Editar} className={AdmUnidade.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmUnidade.icon}/>
                            <img src={Editar} className={AdmUnidade.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmUnidade.icon}/>
                            <img src={Editar} className={AdmUnidade.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmUnidade.icon}/>
                            <img src={Editar} className={AdmUnidade.icon}/>
                        </li>                        <li>
                            Teste
                            <img src={Excluir} className={AdmUnidade.icon}/>
                            <img src={Editar} className={AdmUnidade.icon}/>
                        </li>
                        
                    </ul>

                </div>
            </div>
        </div>
    )
}