import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const SearchBar = () => {
    const [search, setSearch] = useState('');

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearch = () => {
        // Realizar la solicitud GET utilizando Axios
        window.location.pathname = `/workers`;
        /*
        axios.get(`/workers?search=${search}`)
            .then(response => {
                // Manejar la respuesta aquí
                console.log(response.data);
            })
            .catch(error => {
                // Manejar errores aquí
                console.error('Error al realizar la búsqueda:', error);
            });
            */
    };

    return (
        <div className="d-flex col-6 justify-content-center align-items-center">
            <div className="col-10 d-flex py-2" style={{ border: "2px solid #74c87a", borderRadius: "32px", alignItems: "center", paddingLeft: "10px" }}>
                <div className="col">
                    <input
                        className="search-bar"
                        type="text"
                        name="Search"
                        id="search"
                        placeholder="¿Qué quieres solucionar hoy?"
                        value={search}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-1 m-0">
                    <Link to="/workers" onClick={handleSearch}>
                        <button className="btn-search">
                            <img
                                style={{ maxHeight: "80%", maxWidth: "80%" }}
                                src="/Iconos/Icono-Lupa.png"
                                alt=""
                            />
                        </button>
                    </Link>
                </div>
            </div>

            <div className="col-2 mx-5">
                <button className="px-4 btn-filter">
                    Filtros
                </button>
            </div>
        </div>
    );
}

export default SearchBar;