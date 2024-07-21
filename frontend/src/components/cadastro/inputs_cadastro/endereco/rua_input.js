import React,{useState, useEffect} from "react"
import Rua from "../input.module.css"

export default function Rua_input({r}){
    const [rua,setRua] = useState(r)

    useEffect(() => {
        setRua(r)
    }, [r])

    return(
        <div className={Rua.esquerda}>
            <label className={Rua.label}><b>Rua</b></label><br />
            <input type="text" id="rua" required className={Rua.input}
            onChange={(e)=>setRua(e.target.value)} value={rua}/><br />
        </div>
    )
}