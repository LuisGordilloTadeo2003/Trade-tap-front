import React from "react";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";
import { useState } from "react";
import { Search } from "react-bootstrap-icons";

const SearchBar = () => {
    const [search, setSearch] = useState('');

    const handleInputChange = (event) => {
        setSearch(event.target.value);
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
                    <Link to={`/workers?search=${search}`}>
                        <Search color="white" size={30} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;