import React from "react"
import Styles from "./form.module.css";

import Nome from "../inputs_cadastro/nome_input";
import Email from "../inputs_cadastro/email_input";
import CPF from "../inputs_cadastro/cpf_input";
import Genero from "../inputs_cadastro/genero_input";
import RG from "../inputs_cadastro/rg_input";
import Telefone from "../inputs_cadastro/telefone_input";
// import DtNasc from "../inputs_cadastro/dt_nasc_input";
// import DC from "../inputs_cadastro/destro_canhoto_input";


// // Import dos Input de Endereço
// import Cep from "../inputs_cadastro/endereco/cep_input";
// import UF from "../inputs_cadastro/endereco/uf_input";
// import Cidade from "../inputs_cadastro/endereco/cidade_input";
// import Bairro from "../inputs_cadastro/endereco/bairro_input";
// import Rua from "../inputs_cadastro/endereco/rua_input";

export default function Form(){
    return(
        <div>
            <div className={Styles.backgroundContainer}>
                <img src={require('../../imgs/background1.png')} alt="Background" className={Styles.responsiveImg} draggable="false"/>
            </div>
            <div className={Styles.container}>
                <form id="formcadastroaluno" className={Styles.form} autoComplete="off">
                    <div>
                        <div className={Styles.textcenter}>
                          <h1>Dados do Aluno</h1>
                        </div>
                        <div className={Styles.container_inputs}>
                            <Nome />
                            <Email />
                            
                            <CPF />
                            <Genero />

                            <RG />
                            <Telefone />
                            
                            <br />
                            <button type="button" className={Styles.button}>Avançar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}