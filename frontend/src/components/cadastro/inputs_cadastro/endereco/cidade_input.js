import React,{useState} from "react"
import Cidade from "../input.module.css"

export default function Cidade_input(props){
    const [cidade, setCidade] = useState(props.c)
    return(
        <div className={Cidade.esquerda}>
            <label className={Cidade.label}><b>Cidade</b></label><br />
            <input type="text" id="cidade" placeholder="Coloque sua cidade" required className={Cidade.input}
            onChange={(e)=>setCidade(e.target.value)} value={cidade}/><br />
        </div>
    )
}