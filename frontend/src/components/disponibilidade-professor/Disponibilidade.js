import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Timetable from 'react-timetable-events'

import ContainerCss from "../containers.module.css";
import EstiloDispo from "./disponibilidade.module.css";

import Background_Sistema from "../background/BackSistema";
import BarraLateral from "../barra-lateral/BarraLateral";
import Notifica from "../sino-notificacao/Notificacao";
import BtnVoltar from "../btn-voltar/BotaoVoltar";

export default function Disponibilidade_Prof(){
    const navigate = useNavigate();
    const [professor, setProfessor] = useState("");
    const [professores, setProfessores] = useState([]);

    useEffect(() => {
        logado();
        fetchProfessores();
    },[]);

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

    const fetchProfessores = async () => {
        try {
          const response = await axios.get("/api/professor/");
          const nomes = response.data.map((prof) => ({
            id: prof.id_pessoa,
            nome: prof.nome_pessoa,
          }));
          setProfessores(nomes);
        } catch (error) {
          console.error("Erro ao buscar professores:", error);
        }
    };

    // Codigo para fazer a Table
    const eventos = {
        monday: [
            {
                id: 1,
                name: "E.E Dom Walter Bini",
                type: "custom",
                startTime: new Date("2018-02-23T11:30:00"),
                endTime: new Date("2018-02-23T13:30:00"),
            },
        ],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
    };

    return(
        <div>
            <Background_Sistema />
            <div className={ContainerCss.container}>
                <BarraLateral />
                <div className={EstiloDispo.container_Dispo}>
                    <div className={EstiloDispo.divInput}>
                        <select id="SelecaoProfessor" className={EstiloDispo.inputSelect}
                        value={professor} onChange={(e)=>{setProfessor(e.target.value)}}>
                            <option value="" disabled>
                                Selecionar Professor
                            </option>
                            {professores.map((professor) => (
                                <option key={professor.id} value={professor.id}>
                                    {professor.nome}
                                </option>
                            ))}
                      </select>  
                    </div>
                    <div className={EstiloDispo.divCalendario}>
                        <Timetable
                            events={eventos}
                            hoursInterval={{ from: 8, to: 22 }}
                            timeLabel="Horários"
                            days={[
                                { day: 'monday', label: 'Segunda' },
                                { day: 'tuesday', label: 'Terça' },
                                { day: 'wednesday', label: 'Quarta' },
                                { day: 'thursday', label: 'Quinta' },
                                { day: 'friday', label: 'Sexta' },
                                { day: 'saturday', label: 'Sábado' },
                            ]}
                            style={{height: "100%"}}
                        />
                    </div>
                </div>
            </div>
            <Notifica />
            <BtnVoltar />
        </div>
    )
}