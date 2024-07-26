import React, { useEffect } from "react"
import Submit from "./submit_logar.module.css"
import axios from "axios";
import { useNavigate} from "react-router-dom";

export default function Submit_logar(){
    const navigate = useNavigate();
    
    useEffect(() =>{
        logado();
    })

    const login = async(event)=>{
        event.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            const response = await axios.post('/login', { email, senha });
            if(response.data.nome){
                navigate('/home');
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
            navigate('/home')
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
                <h1>Entrar</h1>
            </button>
        </div>
    )
}