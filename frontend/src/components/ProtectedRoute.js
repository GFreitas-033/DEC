// DEC-Clone/frontend/src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ adminOnly }) => {
    const [auth, setAuth] = useState({
        loading: true,
        autenticado: false,
        adm: false,
        nome: ''
    });

    useEffect(() => {
        axios.get('/api/check-auth', { withCredentials: true })
            .then(res => {
                setAuth({
                    loading: false,
                    autenticado: res.data.autenticado,
                    adm: res.data.adm,
                    nome: res.data.nome
                });
            })
            .catch(() => {
                setAuth({
                    loading: false,
                    autenticado: false,
                    adm: false,
                    nome: ''
                });
            });
    }, []);

    if (auth.loading) {
        return null;
    }

    if (!auth.autenticado) {
        return <Navigate to="/" />;
    }

    if (adminOnly && !auth.adm) {
        return <Navigate to="/home" />;
    }

    // Passa os dados de autenticação para os componentes filhos
    return <Outlet context={{ user: auth }} />;
};

export default ProtectedRoute;