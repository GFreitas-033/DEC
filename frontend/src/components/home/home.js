import React, { useEffect, useState } from "react"
import axios from "axios"


export default function Home(){
    
    const [message, setMessage] = useState("Home");

    useEffect(() =>{
        logado();
    },[])

    const logado = async()=>{
        try {
            let response = await axios.post('/login');
            setMessage(response.data);
        } catch (error) {
            window.location.href = window.location.href.replace("home","");
        }
    }

    const sair = async()=>{
        try {
            await axios.post('/sair');
            let link = window.location.href;
            link.replace("home","");
            window.location.href = link;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    return(
        <div>
            <h1>Você Entrou 🤓☝️</h1>
            <h1>Usuário: {message}</h1>
            <button onClick={sair}>Sair</button>
        </div>
    )
}