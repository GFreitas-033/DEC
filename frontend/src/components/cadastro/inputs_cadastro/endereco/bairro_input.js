import React,{useState} from "react"
import Bairro from "../input.module.css"

export default function Bairro_input(props){
    const [bairro, setBairro] = useState(props.b)
    return(
        <div className={Bairro.esquerda}>
            <label className={Bairro.label}><b>Bairro</b></label><br />
            <input type="text" id="bairro" placeholder="Coloque seu Bairro" required className={Bairro.input}
            onChange={(e)=>setBairro(e.target.value)} value={bairro}/><br />
        </div>
    )
}