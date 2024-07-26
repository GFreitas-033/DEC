import React from "react";
import Submit from "./submit_cadastro.module.css";
import axios from "axios";

export default function Submit_logar(props) {
  
  function tratamentoString(inputString) {
    return inputString.replace(/[.\-()\s]/g, '');
  }

  // Obter a data atual
  const dataAtual = new Date();
  const adicionarZero = (numero) => (numero < 10 ? `0${numero}` : numero);
  const ano = dataAtual.getFullYear();
  const mes = adicionarZero(dataAtual.getMonth() + 1);
  const dia = adicionarZero(dataAtual.getDate());
  const dataFormatadaMySQL = `${ano}-${mes}-${dia}`;


  async function cliquei() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const nome = document.getElementById('nome').value;
    const cpf = tratamentoString(document.getElementById('cpf').value);
    const rg = tratamentoString(document.getElementById('rg').value);
    const telefone = tratamentoString(document.getElementById('telefone').value);
    const dt_nascimento = document.getElementById('dt_nasc').value;
    const maodominante = document.getElementById('maodominante').value;
    const genero = document.getElementById('genero').value;
    const cep = document.getElementById('cep').value;
    const uf = document.getElementById('uf').value;
    const cidade = document.getElementById('cidade').value;
    const bairro = document.getElementById('bairro').value;
    const rua = document.getElementById('rua').value;
    
    try {
      let responseEndereco = await axios.post('api/endereco/', {
        cep: cep,
        estado: uf,
        cidade: cidade,
        bairro: bairro,
        rua: rua,
        numero: null
      });
      responseEndereco = responseEndereco.data;
      
      let responsePessoa = await axios.post('api/pessoa/', {
        nome_pessoa: nome,
        dt_nasc_pessoa: dt_nascimento,
        cpf_pessoa: cpf,
        rg_pessoa: rg,
        email_pessoa: email,
        senha_pessoa: senha,
        telefone_pessoa: telefone,
        genero: genero,
        id_endereco: responseEndereco.id
      });
      responsePessoa = responsePessoa.data;

      const responseAluno = await axios.post('api/aluno',{
        id_pessoa: responsePessoa.id, 
        destro_canhoto:maodominante, 
        id_responsavel:null, 
        dt_inicio: dataFormatadaMySQL
      })

      if (props.onResponse) {
        props.onResponse(responseAluno.data);
      }
    } catch (error) {
      console.log("Erro ao criar aluno: ", error);
    }
  }

  return (
    <div>
      <button onClick={cliquei} className={Submit.btn}>
        <h1>{props.btn}</h1>
      </button>
    </div>
  );
}
