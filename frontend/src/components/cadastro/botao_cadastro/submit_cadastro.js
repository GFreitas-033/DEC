import React, { useEffect } from "react"
import Submit from "./submit_cadastro.module.css"
import axios from "axios";

export default function Submit_logar(){
    
    useEffect(() =>{
        logado();
    },[])

    const login = async(event)=>{
        event.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            console.log(email,senha);
            const response = await axios.post('/login', { email, senha });
            if(response.data.nome){
                window.location.href = window.location.href+"home";
            }
            
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(`Erro: ${error.response.data.message}`);
            } else {
                alert('Erro ao realizar login.');
            }
        }
    }

    const logado = async()=>{
        try {
            await axios.post('/login');
            window.location.href = window.location.href+"home";
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(`Erro: ${error.response.data.message}`);
            } else {
                alert('Erro ao realizar login.');
            }
        }
    }


    return(
        <div>
            <button type="submit" className={Submit.btn} onClick={login}>
                <h1>Cadastrar</h1>
            </button>
        </div>
    )
}