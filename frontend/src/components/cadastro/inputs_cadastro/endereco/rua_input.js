import React,{useState} from "react"
import Rua from "../input.module.css"

export default function Rua_input(props){
    const [rua,setRua] = useState(props.r)
    return(
        <div className={Rua.esquerda}>
            <label className={Rua.label}><b>Rua</b></label><br />
            <input type="text" id="rua" placeholder="Coloque sua rua" required className={Rua.input}
            onChange={(e)=>setRua(e.target.value)} value={rua}/><br />
        </div>
    )
}