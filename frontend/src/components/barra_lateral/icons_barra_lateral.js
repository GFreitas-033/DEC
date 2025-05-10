// Import necessarios
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import Icons from "./icons.module.css";

export default function Barra_lateral() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAdm, setIsAdm] = useState(false);

    const alertSair = () =>{
        Swal.fire({
            title: "Quer Realmente Sair?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sim, Quero Sair!",
            cancelButtonColor: "#d33",
            confirmButtonColor: "#fbd034",
            iconColor: "#fbd034",
            background: "#2b2b2b",
            theme: "dark"
        }).then((result) => {
            if (result.isConfirmed) {
                sair();
            }
        });
    }

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

    const sair = async () => {
        try {
            await axios.get('/sair');
            localStorage.removeItem('isAdm');  // Remover o item armazenado no logout
            navigate('/');
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    };

    return (
        <div className={Icons.barra_lateral}>
            <img src={require('../../imgs/logo2.png')} className={Icons.imgs_logo} alt="Logo" />
            <Link to="/home" className={location.pathname === "/home" ? Icons.ativo : ""}>
                <img src={require('../../imgs/icons/icon2.png')} className={Icons.imgs} alt="Home Icon" />
                <p className={Icons.text}>Home</p>
            </Link>
            <Link to="/aulas" className={location.pathname === "/aulas" ? Icons.ativo : ""}>
                <img src={require('../../imgs/icons/icon3.png')} className={Icons.imgs} alt="Calendar Icon" />
                <p className={Icons.text}>Aulas</p>
            </Link>
            {isAdm && (
                <Link to="/adm" className={location.pathname === "/adm" ? Icons.ativo : ""}>
                    <img src={require('../../imgs/icons/icon1.png')} className={Icons.imgs} alt="Admin Icon" />
                    <p className={Icons.text}>Adm</p>
                </Link>
            )}
            <Link>
                <img src={require('../../imgs/icons/logout.png')} className={Icons.imgs} alt="Logout Icon" onClick={alertSair} />
                <p className={Icons.text}>Sair</p>
            </Link>
        </div>
    );
}
