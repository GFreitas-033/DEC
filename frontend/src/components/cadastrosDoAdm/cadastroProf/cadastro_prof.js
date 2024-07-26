import React, { useEffect } from "react";
import ContainerCss from "../../containers.module.css"
import BarraLateral from "../../barra_lateral/icons_barra_lateral"
import ContentCadastroProfessor from "./content_cadastro_prof"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cadastro_prof(props){
    const navigate = useNavigate();


    useEffect(() => {
        logado();
    });

    const logado = async () => {
        try {
            let response = await axios.post('/login');
            response = response.data;
            if(response.adm!==1){
                navigate('/home');
            }
        } catch (error) {
            navigate('/');
        }
    };

    return(
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentCadastroProfessor texto={props.texto} botao={props.botao}/>
        </div>
    )
}