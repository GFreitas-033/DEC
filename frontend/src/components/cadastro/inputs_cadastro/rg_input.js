import React,{useState} from "react"
import Rg from "./input.module.css"

export default function Rg_input(){
    const [rg, setRg] = useState("")

    function formatarRG(event) {
        let r = event.target.value
        r = r.replace(/\D+/g, "")
        r = r.replace(/^(\d{2})(\d)/, "$1.$2")
        r = r.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        r = r.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d{1})/, "$1.$2.$3-$4")
        if(r.length>12){
            r = r.substring(0,12)
        }
        setRg(r)
    }
    return(
        <div className={Rg.esquerda}>
            <label className={Rg.label}><b>RG</b></label><br />
            <input type="text" id="rg" placeholder="Insira um Rg aqui" required className={Rg.input}
            onChange={formatarRG}
            value={rg} autoComplete="off"/><br />
        </div>
    )
}