import React, { useEffect } from "react";
import ContainerCss from "../../containers.module.css"
import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import ContentCadastroUnidade from "./content_cadastro_unidade"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cadastro_unidade(props){
    const navigate = useNavigate();


    useEffect(() => {
        logado();
    });

    const logado = async () => {
        try {
            let response = await axios.post('/login');
        } catch (error) {
            navigate('/');
        }
    };

    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentCadastroUnidade texto={props.texto} botao={props.botao} url={props.url}/>
        </div>
    )
}