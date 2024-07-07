import React,{useState} from "react"
import Styles from "./form.module.css"

import Texto from "../textos_cadastro/texto_cadastro"

// Import dos Input
import Email from "../inputs_cadastro/email_input"
import Senha from "../inputs_cadastro/senha_input"
import Nome from "../inputs_cadastro/nome_input"
import CPF from "../inputs_cadastro/cpf_input"
import RG from "../inputs_cadastro/rg_input"
import Telefone from "../inputs_cadastro/telefone_input"
import Dt_nasc from "../inputs_cadastro/dt_nasc_input"
import DC from "../inputs_cadastro/destro_canhoto_input"
  // Import dos Input de Endereço
  import Cep from "../inputs_cadastro/endereco/cep_input"
  import UF from "../inputs_cadastro/endereco/uf_input"
  import Cidade from "../inputs_cadastro/endereco/cidade_input"
  import Bairro from "../inputs_cadastro/endereco/bairro_input"
  import Rua from "../inputs_cadastro/endereco/rua_input"
// Import Botão
import Botao from "../botao_cadastro/submit_cadastro"

export default function Form(){
  const [logradouro, setLogradouro] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [uf, setUf] = useState("")
  
  const handleBuscarCep = (cep) => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((dados) => {
        setLogradouro(dados.logradouro)
        setBairro(dados.bairro)
        setCidade(dados.localidade)
        setUf(dados.uf)
      })
      .catch((error) => {
        console.error('Erro ao buscar CEP:', error)
      })
  }

  return(
    <div className={Styles.container_formcadastro}>
      <form className={Styles.form} autoComplete="off">
        <Texto />
        <div className={Styles.container_inputs}>
          <Email />
          <Senha />
          <Nome />
          <CPF />
          <RG />
          <Telefone />
          <Dt_nasc />
          <DC />

          <Cep onBuscarCep={handleBuscarCep} />

          <UF u={uf}/>
          <Cidade c={cidade}/>
          <Bairro b={bairro}/>
          <Rua r={logradouro}/>
        </div>
        <Botao />
      </form>
    </div>
  )
}