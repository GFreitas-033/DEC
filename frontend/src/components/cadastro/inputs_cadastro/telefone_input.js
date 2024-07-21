import React,{useState} from "react"
import Telefone from "./input.module.css"

export default function Telefone_input(){
    const [telefone, setTelefone] = useState("")

    function formatarTel(event) {
        let t = event.target.value
        t = t.replace(/\D+/g, "")
        t = t.replace(/(\d{2})(\d)/, "($1) $2")
        t = t.replace(/(\d{5})(\d)/, "$1-$2")
        if(t.length>15){
            t = t.substring(0,15)
        }
        setTelefone(t)
    }
    return(
        <div className={Telefone.esquerda}>
            <label className={Telefone.label}><b>Telefone</b></label><br />
            <input type="text" id="Telefone" placeholder="Insira um Telefone aqui" required className={Telefone.input}
            onChange={formatarTel}
            value={telefone}/><br />
        </div>
    )
}