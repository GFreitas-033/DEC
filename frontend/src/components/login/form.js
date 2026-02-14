import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import Styles from "./form.module.css";

import Background from "../background/BackCadastro";

export default function Form_Login(){
  const navigate = useNavigate();

  const alertSenha = ()=>{
    Swal.fire({
      title: 'A senha está Incorreta!',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#fbd034',
    })
  }
  const alertUsuario = ()=>{
    Swal.fire({
      title: 'O usuário está Incorreto!',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#fbd034'
    });
  }
  
    
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/check-auth');
        if (response.data.autenticado) {
          navigate('/home');
        }
      } catch (error) {
        console.log('Usuário não autenticado.');
      }
    };
    checkAuth();
  }, [navigate]);

  const login = async(event)=>{
      event.preventDefault();
      const usuario = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      try {
          const response = await axios.post('/login', { usuario, senha });
          if(response.data.nome){
              navigate('/home');
          }
          
      } catch (error) {
          console.log(error);
        
          if(error.response.data.message===1){
            alertUsuario();
          }else if(error.response.data.message===2){
            alertSenha();
          }else {
            console.log('Erro ao realizar login.');
          }
      }
  }

  return(
    <div>
        <Background />
        <div className={Styles.container_formlogin}>
          <div className={Styles.borda}>
            <form className={Styles.form} autoComplete="off">
              <div className={Styles.textcenter}>
                <h1>Login</h1>
              </div>
              <div className={Styles.esquerda}>
                <label className={Styles.label}><b>Usuário</b></label><br />
                <input type="email" id="email" placeholder="Coloque seu usuário aqui"
                 required className={Styles.input}/><br />
              </div>
              <div className={Styles.esquerda}>
                <label className={Styles.label}><b>Senha</b></label><br />
                <input type="password" id="senha" placeholder="Coloque sua senha aqui" 
                required className={Styles.input}/><br />
              </div>
              <div>
                <button type="submit" className={Styles.btn} onClick={login}>
                  <h1>Entrar</h1>
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}
