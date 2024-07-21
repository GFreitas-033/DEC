import React,{useState} from "react"
import Cpf from "./input.module.css"

export default function Cpf_input(){
    const [cpf, setCpf] = useState("")

    function formatarCPF(event) {
        let c = event.target.value
        c = c.replace(/\D+/g, "")
        c = c.replace(/^(\d{3})(\d)/, "$1.$2")
        c = c.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        c = c.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{2})/, "$1.$2.$3-$4")
        if(c.length>14){
            c = c.substring(0,14)
        }
        setCpf(c)
    }
    return(
        <div className={Cpf.esquerda}>
            <label className={Cpf.label}><b>CPF</b></label><br />
            <input type="text" id="cpf" placeholder="Insira um Cpf aqui" required className={Cpf.input} 
            onChange={formatarCPF}
            value={cpf}/><br />
        </div>
    )
}