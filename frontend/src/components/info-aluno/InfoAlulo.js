import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import ContainerCss from "../containers.module.css";
import InfoStyle from "./infoAluno.module.css";

import Background_Sistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

// Imports dos Inputs para Pessoa
import Nome from "../inputs-cadastro/Nome";
import Email from "../inputs-cadastro/Email";
import Cpf from "../inputs-cadastro/Cpf";
import Rg from "../inputs-cadastro/Rg";
import Telefone from "../inputs-cadastro/Telefone";
import DtNasc from "../inputs-cadastro/DtNasc";
import Genero from "../inputs-cadastro/Genero";
import DC from "../inputs-cadastro/DestroCanhoto";

// Imports do Endereço
import Cep from "../inputs-cadastro/endereco/Cep";
import UF from "../inputs-cadastro/endereco/Uf";
import Cidade from "../inputs-cadastro/endereco/Cidade";
import Bairro from "../inputs-cadastro/endereco/Bairro";
import Rua from "../inputs-cadastro/endereco/Rua";

export default function Tela_Info_Aluno(){
    const navigate = useNavigate();

    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={InfoStyle.content}>
                    <div className={InfoStyle.textcenter}>
                        <h1>Informações Do Aluno</h1>
                    </div>
                    <form className={InfoStyle.form}>
                        <div className={InfoStyle.contentInputs}>
                            <Nome value={""} />
                            <Email value={""} />
                            <Cpf value={""} />
                            <Rg value={""} />
                            <Telefone value={""} />
                            <DtNasc value={""} />
                            <Genero value={""} />
                            <DC value={""} />
                        </div>
                    </form>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    );
}