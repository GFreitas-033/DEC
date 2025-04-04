// Import necessarios
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import Icons from "./icons.module.css";

export default function Barra_lateral() {
    const [isAdm, setIsAdm] = useState(false);

    const bloquearImg = () => {
        let icones = document.getElementsByTagName('img');
        Array.from(icones).forEach((icone) => {
            icone.setAttribute("draggable", false);
        });
    };

    const verificaAdm = async () => {
        try {
            let response = await axios.post('/login');
            response = response.data;
            const adm = response.adm === 1;
            setIsAdm(adm);
            localStorage.setItem('isAdm', JSON.stringify(adm));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const storedAdm = localStorage.getItem('isAdm');
        if (storedAdm !== null) {
            setIsAdm(JSON.parse(storedAdm));
        } else {
            verificaAdm();
        }
        bloquearImg();
    }, []);

    const navigate = useNavigate();

    const sair = async () => {
        try {
            await axios.get('/sair');
            localStorage.removeItem('isAdm');  // Remover o item armazenado no logout
            navigate('/');
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    };
    const sairAnimacao = () =>{
        Swal.fire({
            title: "Quer Realmente Sair?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Quero Sair!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Você Saiu!",
                    icon: "success"
                });
                sair();
            }
        });
    }

    return (
        <div className={Icons.barra_lateral}>
            <img src={require('../../imgs/logo2.png')} className={Icons.imgs_logo} alt="Logo" />
            <Link to="/home">
                <img src={require('../../imgs/icons/icon2.png')} className={Icons.imgs} alt="Home Icon" />
                <p className={Icons.text}>Home</p>
            </Link>
            <Link to="/aulas">
                <img src={require('../../imgs/icons/icon3.png')} className={Icons.imgs} alt="Calendar Icon" />
                <p className={Icons.text}>Aulas</p>
            </Link>
            {isAdm && (
                <Link to="/adm">
                    <img src={require('../../imgs/icons/icon1.png')} className={Icons.imgs} alt="Admin Icon" />
                    <p className={Icons.text}>Adm</p>
                </Link>
            )}
            <Link>
                <img src={require('../../imgs/icons/logout.png')} className={Icons.imgs} alt="Logout Icon" onClick={sairAnimacao} />
                <p className={Icons.text}>Sair</p>
            </Link>
        </div>
    );
}
