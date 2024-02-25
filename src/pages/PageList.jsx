import React, { useState, useEffect } from "react";
import List from "../components/ListPage/List"
import axios from "../lib/axios";
import Cookies from 'js-cookie';

const PageList = () => {
    const [results, setResults] = useState([]);
    const [tipo, setTipo] = useState();
    const [page, setPage] = useState();
    const [user, setUser] = useState(null);
    const [profesiones, setProfesiones] = useState([]);
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    const [filtroProfesion, setFiltroProfesion] = useState(null);

    // const urlParams = new URLSearchParams(window.location.search);
    // const searchValue = urlParams.get('search');

    useEffect(() => {
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
                const response = axios.get(path);
                setResults(response.data.data);
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

        try {
            const { data } = axios.get('/api/user');
            setUser(data);
        }
        catch (e) {
            console.warn('Error ', e);
        }

        try {
            const response = axios.get('api/profesion');
            setProfesiones(response.data.data);
        } catch (error) {
            console.log(error);
        }

    }, []);

    if (profesiones.length == 0 && results.length == 0 && user == null) return null;

    return (
        <div>
            <List profesiones={profesiones} filtroProfesion={filtroProfesion} data={results} tipo={tipo} user={user} />
        </div>
    );
}

export default PageList;
