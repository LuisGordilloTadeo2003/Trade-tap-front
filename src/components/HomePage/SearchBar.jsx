import React from "react";

const SearchBar = () => {
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
                    />
                </div>
                <div className="col-1 m-0">
                    <button className="btn-search">
                        <img
                            style={{ maxHeight: "80%", maxWidth: "80%" }}
                            src="/Iconos/Icono-Lupa.png"
                            alt=""
                        />
                    </button>
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