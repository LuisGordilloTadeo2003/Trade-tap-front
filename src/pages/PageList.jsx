import React, { useState, useEffect } from "react";
import List from "../components/ListPage/List"
import axios from "../lib/axios";

const PageList = () => {
    const [results, setResults] = useState();
    const [tipo, setTipo] = useState("");

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
                    const response = await axios.get(path);
                    setResults(response.data.data);
                    setTipo(tipo);
                }
            } catch (error) {
                console.error('Error al realizar la búsqueda:', error);
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
