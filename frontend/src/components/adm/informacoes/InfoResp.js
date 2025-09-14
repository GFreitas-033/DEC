import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ContainerCss from "../../containers.module.css";
import InfoStyle from "./informacoes.module.css";

import Background_Sistema from "../../background/BackSistema";
import BarraLateral from "../../barra-lateral/BarraLateral";
import Notifica from "../../sino-notificacao/Notificacao";
import BtnVoltar from "../../btn-voltar/BotaoVoltar";

// Imports dos Inputs para Pessoa
import Nome from "../../inputs-cadastro/Nome";
import Email from "../../inputs-cadastro/Email";
import Cpf from "../../inputs-cadastro/Cpf";
import Rg from "../../inputs-cadastro/Rg";
import Telefone from "../../inputs-cadastro/Telefone";
import Genero from "../../inputs-cadastro/Genero";

// Formatações
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" }); // Formato DD/MM/YYYY
}

function formatCPF(cpf) {
  if (!cpf) return "";
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

function formatRG(rg) {
  if (!rg) return "";
  return rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
}

function formatTelefone(telefone) {
  if (!telefone) return "";
  return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
}

export default function Tela_Info_Responsavel({ isEditar }){
    const navigate = useNavigate();
    const { id_aluno } = useParams();

    // Estados do aluno
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cadastro, setCadastro] = useState("");
    const [genero, setGenero] = useState("");

    useEffect(() => {
        if (id_aluno) {
            preencherDados();
        }
    }, [id_aluno]);

    async function preencherDados() {
        try {
            const response = await axios.get(`/api/aluno/allData/${id_aluno}`);
            const dados = response.data[0];

            // Aluno
            setNome(dados.nome_aluno || "");
            setEmail(dados.email_aluno || "");
            setCpf(formatCPF(dados.cpf_aluno));
            setGenero(dados.genero_aluno || "");
            setRg(formatRG(dados.rg_aluno));
            setTelefone(formatTelefone(dados.telefone_aluno));
            setCadastro(formatDate(dados.dt_inicio));
      } catch (error) {
            console.error("Erro ao buscar dados:", error);
      }
    }

    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={InfoStyle.content}>
                    <div className={InfoStyle.textcenter}>
                        <h1>{isEditar ? "Editar Responsável" : "Informações Do Responsável"}</h1>
                    </div>
                    <form className={InfoStyle.form}>
                        <div className={InfoStyle.contentInputs}>
                            <Nome value={nome} readOnly />
                            <Email value={email} readOnly />
                            <Cpf value={cpf} readOnly />
                            <Rg value={rg} readOnly />
                            <Telefone value={telefone} readOnly />
                            <Genero value={genero} disabled />
                        </div>
                        <div className={InfoStyle.divLista}>
                            <label className={InfoStyle.label}><b>
                                Número de Alunos: {"3"}
                            </b></label>
                            <ul className={InfoStyle.lista}>
                                <li>Aluno 1</li>
                                <li>Aluno 2</li>
                                <li>Aluno 3</li>
                            </ul>
                        </div>
                        {isEditar && (
                            <div className={InfoStyle.divBtn}>
                                <button className={InfoStyle.btn}>
                                    <h1>Editar Responsavel</h1>
                                </button>
                            </div>
                        )}
                    </form>
                </div>
                <Notifica />
                <BtnVoltar />
            </div>
        </div>
    );
}