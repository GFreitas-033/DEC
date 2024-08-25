import React, { useEffect } from "react"
import ContainerCss from "../containers.module.css"
import BarraLateral from "../barra_lateral/icons_barra_lateral"
import ContentCalendario from "../calendario/content_calendario"
import { useNavigate} from "react-router-dom";
import axios from "axios";
import Notifica from "../sino_notificacao/notificacao"

export default function Calendario(){
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
            <ContentCalendario/>
            <Notifica />
        </div>
    )
}