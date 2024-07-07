import React,{useState} from "react"
import Cep from "../input.module.css"

export default function Cep_input({ onBuscarCep }){
    const [cep,setCep] = useState("")

    const buscarCep = () => { 
        onBuscarCep(cep)
    }

    return(
        <div>
            <div className={Cep.esquerda}>
                <label className={Cep.label}><b>Cep</b></label><br />
                <div className={Cep.divCep}>
                    <input type="text" id="cep" placeholder="Coloque seu Cep" required className={Cep.input}
                    onChange={(e)=>setCep(e.target.value)}/>
                    <br />
                    <button className={Cep.busca} onClick={()=>{buscarCep()}}>Buscar</button><br />
                </div>
            </div>
        </div>
    )
}