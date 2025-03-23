import React from "react";
import { useNavigate } from "react-router-dom";
import EstiloBtnVoltar from "./btnVoltar.module.css";

export default function BtnVoltar() {
    const navigate = useNavigate()
    return (
        <div className={EstiloBtnVoltar.containerBtnVoltar} onClick={()=>{navigate(-1)}}>
            <img src={require('../../imgs/icons/seta-esquerda.png')}
                className={EstiloBtnVoltar.setaImg} alt="voltar" />
            <p>
                <b>Voltar</b>
            </p>
        </div>
    )
}