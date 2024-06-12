import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cadastro(){
    const navigate = useNavigate();

    useEffect(() => {
        logado();
    });

    const logado = async () => {
        try {
            let response = await axios.post('/login');
            console.log(response.data);
        } catch (error) {
            navigate('/');
        }
    };


    return(
        <div>
            <h1>Aqui vc faz o Cadastro</h1>
            <h1>Cadastro</h1>
        </div>
    )
}