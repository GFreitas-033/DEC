// Import necessarios
import React, { useEffect, useState } from "react";
import Icons from "./icons.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import de Icons
import Logo from "../../imgs/logo2.png";
import Casa from "../../imgs/icon2.png";
import Calendario from "../../imgs/icon3.png";
import Adm from "../../imgs/icon1.png";
import Logout from "../../imgs/logout.png";

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

    return (
        <div className={Icons.barra_lateral}>
            <img src={Logo} className={Icons.imgs_logo} alt="Logo" />
            <Link to="/home">
                <img src={Casa} className={Icons.imgs} alt="Home Icon" />
                <p className={Icons.text}>Home</p>
            </Link>
            <Link to="/aulas">
                <img src={Calendario} className={Icons.imgs} alt="Calendar Icon" />
                <p className={Icons.text}>Aulas</p>
            </Link>
            {isAdm && (
                <Link to="/adm">
                    <img src={Adm} className={Icons.imgs} alt="Admin Icon" />
                    <p className={Icons.text}>Adm</p>
                </Link>
            )}
            <Link to="/">
                <img src={Logout} className={Icons.imgs} alt="Logout Icon" onClick={sair} />
                <p className={Icons.text}>Sair</p>
            </Link>
        </div>
    );
}
