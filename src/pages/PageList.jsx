import React, { useState, useEffect } from "react";
import List from "../components/ListPage/List"
import axios from "../lib/axios";
import Cookies from 'js-cookie';

const PageList = () => {
    const [results, setResults] = useState([]);
    const [tipo, setTipo] = useState();
    const [page, setPage] = useState();
    const [user, setUser] = useState();
    const [profesiones, setProfesiones] = useState([]);
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    const [filtroProfesion, setFiltroProfesion] = useState(null);
    const [loading, setLoading] = useState(true);

    // const urlParams = new URLSearchParams(window.location.search);
    // const searchValue = urlParams.get('search');

    const fetchData = async () => {
        try {
            let path, tipo;
            switch (window.location.pathname) {
                case '/request':
                    setPage("solicitud");
                    path = `api/solicitud`;
                    tipo = "request";
                    break;
                case '/workers':
                    setPage("trabajador");
                    path = `api/trabajador`;
                    tipo = "workers";
                    break;
                case '/proposal':
                    setPage("propuesta");
                    path = `api/propuesta`;
                    tipo = "proposal";
                    break;
                default:
                    path = false;
                    break;
            }

            if (path) {
                axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;
                const response = await axios.get(path);
                setResults(response.data.data);
                setLoading(false);
                setTipo(tipo);
            }
        } catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
            }
            else {
                console.warn(e);
            }
        }
    };

    const getUser = async () => {
        try {
            const { data } = await axios.get('/api/user');
            setUser(data);
            setLoading(false);
        }
        catch (e) {
            console.warn('Error ', e);
        }
    };

    const listadoProfesiones = async () => {
        try {
            const response = await axios.get('api/profesion');
            setProfesiones(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (loading) {
            fetchData();
            getUser();
            setTimeout(listadoProfesiones, 1000);
        }
    }, [loading]);


    return (
        <div>
            <List profesiones={profesiones} filtroProfesion={filtroProfesion} data={results} tipo={tipo} user={user} />
        </div>
    );
}

export default PageList;
