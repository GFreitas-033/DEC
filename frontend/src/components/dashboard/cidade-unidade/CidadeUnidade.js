// CidadeUnidade.js
import React from "react";
import EstiloCidaUni from "./cidadeUnidade.module.css";

export default function CidadeUnidade({ data, filters, onFilterChange }) {
    const cidades = data.cidades || [];
    const unidades = data.unidades || [];

    const handleSelecionarCidade = (cidade) => {
        onFilterChange({ cidade: cidade, unidade: "" });
    };

    const handleSelecionarUnidade = (unidade) => {
        const newUnidade = filters.unidade === unidade ? "" : unidade;
        onFilterChange({ ...filters, unidade: newUnidade });
    };

    const showUnidades = filters.cidade && filters.cidade !== "Todas as Cidades";

    return (
        <div className={EstiloCidaUni.containerCidadeUnidade}>
            <div className={EstiloCidaUni.divCidadeUni}>
                <h1 className={EstiloCidaUni.titulo}>Cidades</h1>
                {cidades.map((cidade, index) => (
                    <p
                        key={index}
                        className={`${EstiloCidaUni.textosCidadeUni} ${
                            filters.cidade === cidade ? EstiloCidaUni.ativo : ""
                        }`}
                        onClick={() => handleSelecionarCidade(cidade)}
                        style={{ cursor: 'pointer' }}
                    >
                        {cidade}
                    </p>
                ))}
            </div>
            <hr className={EstiloCidaUni.hrCidadeUni} />
            <div className={EstiloCidaUni.divCidadeUni}>
                <h1 className={EstiloCidaUni.titulo}>Unidades</h1>
                {showUnidades ? (
                    <>
                        {unidades.length > 0 ? (
                            unidades.map((unidade, index) => (
                                <p
                                    key={index}
                                    className={`${EstiloCidaUni.textosCidadeUni} ${
                                        filters.unidade === unidade ? EstiloCidaUni.ativo : ""
                                    }`}
                                    onClick={() => handleSelecionarUnidade(unidade)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {unidade}
                                </p>
                            ))
                        ) : (
                            <div className={EstiloCidaUni.divNenhuma}>
                                <p>Nenhuma unidade</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={EstiloCidaUni.divNenhuma}>
                        <p>Selecione uma Cidade</p>
                    </div>
                )}
            </div>
        </div>
    );
}