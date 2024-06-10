// Import necessarios
import React from "react";
import Icons from "./icons.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

// Import de Icons
import Logo from "../../imgs/logo2.png";
import Casa from "../../imgs/icon2.png";
import Calendario from "../../imgs/icon3.png";
import Adm from "../../imgs/icon1.png";
import Logout from "../../imgs/logout.png";

export default function barra_lateral() {

    const sair = async () => {
        try {
            await axios.get('/sair');
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    }

    return (
        <div className={Icons.barra_lateral}>
            <img src={Logo} className={Icons.imgs_logo} alt="Logo" />
            <Link to="/home">
                <img src={Casa} className={Icons.imgs} alt="Home Icon" />
                <p className={Icons.text}>Home</p>
            </Link>
            <Link to="/calendario">
                <img src={Calendario} className={Icons.imgs} alt="Calendar Icon" />
                <p className={Icons.text}>Calendário</p>
            </Link>
            <Link to="/adm">
                <img src={Adm} className={Icons.imgs} alt="Admin Icon" />
                <p className={Icons.text}>Adm</p>
            </Link>
            <Link to="/">
                <a href={window.location.href.replace("home", "")} onClick={sair}>
                    <img src={Logout} className={Icons.imgs} alt="Logout Icon" />
                </a>
                <p className={Icons.text}>Sair</p>
            </Link>
        </div>
    );
}
