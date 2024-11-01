import React,{useState, useEffect} from "react"
import Cidade from "../input.module.css"

export default function Cidade_input({c}){
    const [cidade, setCidade] = useState(c)

    useEffect(() => {
        setCidade(c)
    }, [c])

    return(
        <div className={Cidade.esquerda}>
            <label className={Cidade.label}><b>Cidade</b></label><br />
            <input type="text" id="cidade" required className={Cidade.input}
            onChange={(e)=>setCidade(e.target.value)} value={cidade} autoComplete="off"/><br />
        </div>
    )
}