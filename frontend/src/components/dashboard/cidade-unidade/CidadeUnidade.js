import React, { useState } from "react";

import EstiloCidaUni from "./cidadeUnidade.module.css";

export default function Cidade_Unidade(){
    const [mostrar, setMostrar] = useState(false);
    const [cidadeSelecionada, setCidadeSelecionada] = useState("");

    const cidades = ["Todas as Cidades", "Lins", "Bauru", "Rio Preto", "Promissão", "Guaiçara", "Cafelândia"];

    const handleSelecionarCidade = (cidade) => {
        if (cidadeSelecionada === cidade) {
            // Se clicar na mesma, desmarca
            setCidadeSelecionada("");
            setMostrar(false);
        } else {
            // Se clicar em outra, marca
            setCidadeSelecionada(cidade);
            setMostrar(true);
        }
    };

    return(
        <div className={EstiloCidaUni.containerCidadeUnidade}>
            {/* CIDADES */}
            <div className={EstiloCidaUni.divCidadeUni}>
                <h1 className={EstiloCidaUni.titulo}>Cidades</h1>
                {cidades.map((cidade, index) => (
                    <p key={index} className={`${EstiloCidaUni.textosCidadeUni}
                    ${cidadeSelecionada === cidade ? EstiloCidaUni.ativo : ""}`}
                    onClick={() => handleSelecionarCidade(cidade)}
                    style={{cursor: 'pointer'}}>
                        {cidade}
                    </p>
                ))}
            </div>
            <hr className={EstiloCidaUni.hrCidadeUni}/>
            <div className={EstiloCidaUni.divCidadeUni}>
                <h1 className={EstiloCidaUni.titulo}>Unidades</h1>
                {mostrar ? ( 
                    <>
                        {cidades.map((cidade, index) => (
                            <p key={index} className={EstiloCidaUni.textosCidadeUni}
                            style={{cursor: 'default'}}>
                                {cidade}
                            </p>
                        ))}

                        {/* Pode Apagar essa parte comentada */}
                        {/* {cidades.map((cidade, index) => (
                            <p key={index} className={EstiloCidaUni.textosCidadeUni}>{cidade}</p>
                        ))}
                        {cidades.map((cidade, index) => (
                            <p key={index} className={EstiloCidaUni.textosCidadeUni}>{cidade}</p>
                        ))} */}
                    </>
                ):(
                    <div className={EstiloCidaUni.divNenhuma}>
                        <p>Nenhuma Cidade Selecionada</p>
                    </div>
                )}
            </div>
        </div>
    )
}