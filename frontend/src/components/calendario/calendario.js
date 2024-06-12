import React, { useEffect } from "react"
import ContainerCss from "../containers.module.css"
import BarraLateral from "../barra_lateral/icons_barra_lateral"
import ContentCalendario from "../calendario/content_calendario"
import { useNavigate} from "react-router-dom";
import axios from "axios";

export default function Calendario(){
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
        <div className={ContainerCss.container}>
            <BarraLateral />
            <ContentCalendario />
        </div>
    )
}