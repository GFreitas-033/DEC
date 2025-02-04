import React, { useState } from "react"
import Sino from "../../imgs/icons/notificacao.png"
import Sino_Style from "./notificacao.module.css"

export default function Notificacao() {
  const [mostrar, setMostrar] = useState(false);
  const [mensagem, setMensagem] = useState([
    { id: 1, message: 'Notification 1' },
    { id: 2, message: 'Notification 2' },
    { id: 3, message: 'Notification 3' },
    { id: 4, message: 'Notification 4' },
    { id: 5, message: 'Notification 5' },
    { id: 6, message: 'Notification 6' },
  ]);

  const NotificationClick = () => {
    setMostrar(prevMostrar => !prevMostrar);
  };

  return (
    <div className={Sino_Style.containerSino} onClick={NotificationClick}>

      <img src={Sino} className={Sino_Style.sinoImg} />
      <span className={Sino_Style.qtnNotificacao}>{mensagem.length}</span>

      <div className={`${Sino_Style.caixa} ${mostrar ? Sino_Style.mostrar : ''}`}>

        <div className={Sino_Style.mensagemConteiner}>
          {mensagem.map((msg) => (
            <p key={msg.id}>{msg.message}</p>
          ))}
        </div>
      </div>
    </div>
  )
}