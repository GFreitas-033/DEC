import React from "react"
import Submit from "./submit_logar.module.css"
import axios from "axios";

export default function submit_logar(){
    
    const login = async(event)=>{
        event.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        
        try {
            console.log(email,senha);
            const response = await axios.post('/login', { email, senha });
            alert(`Login bem-sucedido! Nome: ${response.data.nome}`);
        } catch (error) {
            console.log(error);
            if (error.response) {
                alert(`Erro: ${error.response.data.message}`);
            } else {
                alert('Erro ao realizar login.');
            }
        }
    }

    return(
        <div>
            <button type="submit" className={Submit.btn} onClick={login}>
                <h1>Entrar</h1>
            </button>
        </div>
    )
}