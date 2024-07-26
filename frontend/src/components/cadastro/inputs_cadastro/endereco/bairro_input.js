import React,{useState, useEffect} from "react"
import Bairro from "../input.module.css"

export default function Bairro_input({b}){
    const [bairro, setBairro] = useState(b)

    useEffect(() => {
        setBairro(b)
    }, [b])

    return(
        <div className={Bairro.esquerda}>
            <label className={Bairro.label}><b>Bairro</b></label><br />
            <input type="text" id="bairro" required className={Bairro.input}
            onChange={(e)=>setBairro(e.target.value)} value={bairro} autoComplete="off"/><br />
        </div>
    )
}