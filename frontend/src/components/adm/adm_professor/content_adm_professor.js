import React from "react"

import AdmProf from "../admAPUT.module.css"
import Botao from "../botao_adm/botao_adm"

import Editar from "../../../imgs/Editar.png"
import Excluir from "../../../imgs/Excluir.png"

export default function Content_adm_professor(){

    return(
        <div className={AdmProf.contentAdm}>
            <div>
                <h1 className={AdmProf.titulo}>Professores</h1>
            </div>

            <div className={AdmProf.divBtn}>
                <Botao v={'/cadastro/professor'}/>
                <p className={AdmProf.qtd}>Quantidade de Professores: 10</p>
            </div>
            
            <div className={AdmProf.tabela}>

                <div className={AdmProf.linhasId}>

                    <ul className={AdmProf.colunaID}>
                        <li className={AdmProf.topoTable}><b><u>ID</u></b></li>

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

                <div className={AdmProf.linhasNome}>
                    <ul>
                        <li className={AdmProf.topoTable}><b><u>Nome</u></b></li>
                        
                        <li>
                            Samuel
                            <img src={Excluir} className={AdmProf.icon}/>
                            <img src={Editar} className={AdmProf.icon}/>
                        </li>

                        <li>
                            André
                            <img src={Excluir} className={AdmProf.icon}/>
                            <img src={Editar} className={AdmProf.icon}/>
                        </li>

                        <li>
                            Guilherme L Freitas
                            <img src={Excluir} className={AdmProf.icon}/>
                            <img src={Editar} className={AdmProf.icon}/>
                        </li>
                        <li>
                            Alexandre
                            <img src={Excluir} className={AdmProf.icon}/>
                            <img src={Editar} className={AdmProf.icon}/>
                        </li>

                        <li>
                            João Pedro Santos
                            <img src={Excluir} className={AdmProf.icon}/>
                            <img src={Editar} className={AdmProf.icon}/>
                        </li>
                        {/* Alguns teste */}
                        
                        <li>
                            Teste
                            <img src={Excluir} className={AdmProf.icon}/>
                            <img src={Editar} className={AdmProf.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmProf.icon}/>
                            <img src={Editar} className={AdmProf.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmProf.icon}/>
                            <img src={Editar} className={AdmProf.icon}/>
                        </li>
                        <li>
                            Teste
                            <img src={Excluir} className={AdmProf.icon}/>
                            <img src={Editar} className={AdmProf.icon}/>
                        </li>                        <li>
                            Teste
                            <img src={Excluir} className={AdmProf.icon}/>
                            <img src={Editar} className={AdmProf.icon}/>
                        </li>
                        
                    </ul>

                </div>
            </div>
        </div>
    )
}