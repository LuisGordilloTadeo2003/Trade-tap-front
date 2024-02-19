import React from "react";
import AcceptOrReject from "./AcceptOrReject";
import Show from "./Show";
import { Link } from "react-router-dom";

const ElementCard = ({ item, index, tipo }) => {
    const generarEstrellas = (valoracion) => {
        const estrellas = [];
        for (let j = 1; j <= valoracion; j++) {
            estrellas.push(<span key={j}>⭐</span>);
        }
        return estrellas;
    };

    const cambiarRuta = () => {
        window.location.pathname = '/';
        console.log('Cambiando la ruta...');
    };

    return (

        <div key={index} className="row d-flex mx-5 my-3" style={{ border: "2px solid #74c87a", borderRadius: "20px" }}>
            <div className="col-1 d-flex align-items-center justify-content-center">
                <img style={{ maxWidth: "100px", maxHeight: "100px" }} src="/Profile.png" alt="" />
            </div>
            <div className="col-7 d-block px-4 align-self-center">
                {
                    tipo === "workers" && (
                        <>
                            <p className="h5">{item.user.name + ' ' + item.user.apellido1 + ' ' + item.user.apellido2}{generarEstrellas(item.valoracion)}</p>
                            <p className="h6">{item.descripcion}</p>
                        </>
                    )
                }
                {
                    (tipo === "request" || tipo === "proposal") && (
                        <>
                            <p className="h5">{item.titulo}</p>
                            <p className="h6">{item.cliente.name + ' ' + item.cliente.apellido1 + ' ' + item.cliente.apellido2}</p>
                        </>
                    )
                }
            </div>

            {
                tipo === "proposal" ? (
                    <AcceptOrReject />
                ) : (
                    <Show cambiarRuta={cambiarRuta} />
                )
            }
        </div>
    );
}

export default ElementCard;