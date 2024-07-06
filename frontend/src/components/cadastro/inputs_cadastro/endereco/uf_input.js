import React, { useState } from "react"
import Uf from "../input.module.css"

export default function Uf_input(props){
    const [uf,setUf] = useState(props.u)
    return(
        <div className={Uf.esquerda}>
            <label className={Uf.label}><b>UF</b></label><br />
            <input type="text" id="uf" placeholder="Coloque sua Uf" required className={Uf.input}
            onChange={(e)=>setUf(e.target.value)} value={uf}/><br />
        </div>
    )
}