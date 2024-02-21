import React, { useState, useEffect } from "react";
import List from "../components/ListPage/List"
import axios from "../lib/axios";
import Cookies from 'js-cookie';

const PageList = () => {
    const [results, setResults] = useState();
    const [tipo, setTipo] = useState("");
    const xsrfToken = Cookies.get('XSRF-TOKEN');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let path, tipo;
                switch (window.location.pathname) {
                    case '/request':
                        path = `api/solicitud`;
                        tipo = "request";
                        break;
                    case '/workers':
                        path = `api/trabajador`;
                        tipo = "workers";
                        break;
                    case '/proposal':
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

        fetchData();

    }, []);

    return (
        <div>
            <List data={results} tipo={tipo} />
        </div>
    );
}

export default PageList;
