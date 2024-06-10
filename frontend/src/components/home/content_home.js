import React, { useEffect, useState } from "react"
import axios from "axios"
import Home from "./home.module.css"


export default function Content_home(){
    
    const [message, setMessage] = useState("");

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

    return(
        <div className={Home.sla}>
            <h1>Você Entrou 🤓☝️</h1>
            <h1>Usuário: {message}</h1>
        </div>
    )
}