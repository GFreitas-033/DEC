import React, {useState, useEffect} from "react"
import Uf from "../input.module.css"

export default function Uf_input({u}){
    const [uf,setUf] = useState(u)

    useEffect(() => {
        setUf(u)
    }, [u])

    return(
        <div className={Uf.esquerda}>
            <label className={Uf.label}><b>UF</b></label><br />
            <input type="text" id="uf" required className={Uf.input}
            onChange={(e)=>setUf(e.target.value)} value={uf} autoComplete="off"/><br />
        </div>
    )
}