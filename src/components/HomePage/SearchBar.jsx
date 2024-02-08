import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Search } from "react-bootstrap-icons";

const SearchBar = () => {
    const [search, setSearch] = useState('');

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearch = () => {
        // Realizar la solicitud GET utilizando Axios
        window.location.pathname = `/workers`;

        axios.get(`/workers?search=${search}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error al realizar la búsqueda:', error);
            });

    };

    return (
        <div className="d-flex col-6 justify-content-center align-items-center">
            <div className="col-10 d-flex" style={{ border: "2px solid #74c87a", borderRadius: "32px", alignItems: "center", paddingLeft: "10px" }}>
                <div className="col-11">
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
                <div className="col-1 pr-3 d-flex justify-content-end">
                    <Link to="/workers" onClick={handleSearch}>
                        <Search color="white" size={30} />
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