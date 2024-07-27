import React from "react";
import Submit from "./submit_cadastro.module.css";

export default function Botao({ btn, onClick }) {
  return (
    <div>
      <button className={Submit.btn}>
        <h1>{btn}</h1>
      </button>
    </div>
  );
}
