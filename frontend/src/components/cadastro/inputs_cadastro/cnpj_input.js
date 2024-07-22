import React,{useState} from "react"
import Cnpj from "./input.module.css"

export default function Cnpj_input(){
    const [cnpj, setCnpj] = useState("")

    function formatarCnpj(event) {
        let c = event.target.value
        c = c.replace(/^(\d{2})(\d)/, "$1.$2")
        c = c.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        c = c.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
        c = c.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d{1})/, "$1.$2.$3/$4-$5")
        if(c.length>18){
            c = c.substring(0,18)
        }
        setCnpj(c)
    }
    return(
        <div className={Cnpj.esquerda}>
            <label className={Cnpj.label}><b>CNPJ</b></label><br />
            <input type="text" id="cnpj" placeholder="Insira um Cnpj aqui" required className={Cnpj.input} 
            onChange={formatarCnpj}
            value={cnpj}/><br />
        </div>
    )
}