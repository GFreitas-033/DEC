// src/components/Notificacao/Notificacao.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Sino from "../../imgs/icons/notificacao.png";
import Sino_Style from "./notificacao.module.css";

export default function Notificacao() {
  const [mostrar, setMostrar] = useState(false);
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    async function fetchMensagens() {
      try {
        const response = await axios.get("/api/minhas_notificacoes/");
        setMensagens(response.data);
      } catch (error) {
        console.error("Erro ao buscar notificacoes:", error);
      }
    }
    fetchMensagens();
  }, []);

  const NotificationClick = () => {
    setMostrar(prev => !prev);
  };

  return (
    <div className={Sino_Style.containerSino} onClick={NotificationClick}>
      <img src={Sino} className={Sino_Style.sinoImg} alt="Sino" />
      {mensagens.length > 0 && (
        <span className={Sino_Style.qtnNotificacao}>{mensagens.length}</span>
      )}

      <div className={`${Sino_Style.caixa} ${mostrar ? Sino_Style.mostrar : ''}`}>
        <div className={Sino_Style.mensagemConteiner}>
          {mensagens.length > 0 ? (
            mensagens.map((msg) => (
              <p key={msg.id_notificacao_uni}>{msg.mensagem}</p>
            ))
          ) : (
            <p>Sem notificacoes.</p>
          )}
        </div>
      </div>
    </div>
  );
}