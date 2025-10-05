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

export default function Tela_Info_Responsavel({ isEditar }) {
    const navigate = useNavigate();
    const { id_responsavel } = useParams();

    // Estados do responsável
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [genero, setGenero] = useState("");

    // Novo estado para a lista de alunos
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        if (id_responsavel) {
            preencherDados();
        }
    }, [id_responsavel]);

    async function preencherDados() {
        try {
            // Requisição para os dados do responsável
            const responseResponsavel = await axios.get(
                `/api/responsavel_aluno/allData/${id_responsavel}`
            );
            const dadosResponsavel = responseResponsavel.data;

            setNome(dadosResponsavel.nome_pessoa || "");
            setEmail(dadosResponsavel.email_pessoa || "");
            setCpf(formatCPF(dadosResponsavel.cpf_pessoa));
            setGenero(dadosResponsavel.genero || "");
            setRg(formatRG(dadosResponsavel.rg_pessoa));
            setTelefone(formatTelefone(dadosResponsavel.telefone_pessoa));

            // Requisição para a lista de alunos associados ao responsável
            const responseAlunos = await axios.get(
                `/api/responsavel_aluno/alunos/${id_responsavel}`
            );
            setAlunos(responseAlunos.data);

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }

    return (
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={InfoStyle.content}>
                    <div className={InfoStyle.textcenter}>
                        <h1>
                            {isEditar
                                ? "Editar Responsável"
                                : "Informações Do Responsável"}
                        </h1>
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
                            <label className={InfoStyle.label}>
                                <b>Número de Alunos: {alunos.length}</b>
                            </label>
                            <ul className={InfoStyle.lista}>
                                {alunos.map((aluno) => (
                                    <li key={aluno.id_pessoa} onClick={() => navigate(`/adm/InformaçõesDoAluno/${aluno.id_pessoa}`)} style={{ cursor: 'pointer' }}>
                                        {aluno.nome_pessoa}
                                    </li>
                                ))}
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