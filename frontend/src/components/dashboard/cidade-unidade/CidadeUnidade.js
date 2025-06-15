import React, { useState } from "react";

import EstiloCidaUni from "./cidadeUnidade.module.css";

export default function CidadeUnidade({ data }) {
    const [mostrar, setMostrar] = useState(false);
    const [cidadeSelecionada, setCidadeSelecionada] = useState("");
    const [unidadeSelecionada, setUnidadeSelecionada] = useState("");

    const cidades = data.cidades;
    const unidades = data.unidades;

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

    const handleSelecionarUnidade = (unidade) => {
        if (unidadeSelecionada === unidade) {
            // Se clicar na mesma, desmarca
            setUnidadeSelecionada("");
        } else {
            // Se clicar em outra, marca
            setUnidadeSelecionada(unidade);
        }
    };

    return (
        <div className={EstiloCidaUni.containerCidadeUnidade}>
            {/* CIDADES */}
            <div className={EstiloCidaUni.divCidadeUni}>
                <h1 className={EstiloCidaUni.titulo}>Cidades</h1>
                {cidades.map((cidade, index) => (
                    <p key={index} className={`${EstiloCidaUni.textosCidadeUni}
                    ${cidadeSelecionada === cidade ? EstiloCidaUni.ativo : ""}`}
                        onClick={() => handleSelecionarCidade(cidade)}
                        style={{ cursor: 'pointer' }}>
                        {cidade}
                    </p>
                ))}
            </div>
            <hr className={EstiloCidaUni.hrCidadeUni} />
            <div className={EstiloCidaUni.divCidadeUni}>
                <h1 className={EstiloCidaUni.titulo}>Unidades</h1>
                {mostrar ? (
                    <>
                        {unidades.map((unidade, index) => (
                            <p key={index} className={`${EstiloCidaUni.textosCidadeUni}
                            ${unidadeSelecionada === unidade ? EstiloCidaUni.ativo : ""}`}
                                onClick={() => handleSelecionarUnidade(unidade)}
                                style={{ cursor: 'pointer' }}>
                                {unidade}
                            </p>
                        ))}
                    </>
                ) : (
                    <div className={EstiloCidaUni.divNenhuma}>
                        <p>Nenhuma Cidade Selecionada</p>
                    </div>
                )}
            </div>
        </div>
    )
}