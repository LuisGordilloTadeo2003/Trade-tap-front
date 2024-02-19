import React from "react";
import AcceptOrReject from "./AcceptOrReject";
import Show from "./Show";

const ElementCard = ({ item, index, tipo }) => {
    const generarEstrellas = (valoracion) => {
        const estrellas = [];
        for (let j = 1; j <= valoracion; j++) {
            estrellas.push(<span key={j}>⭐</span>);
        }
        return estrellas;
    };

    const cambiarRuta = (item) => {
        window.location.assign(`/profile/worker/${item.id}`);
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
                            <p className="h5">{item.user.nombre + ' ' + item.user.apellido1 + ' ' + item.user.apellido2}{generarEstrellas(item.valoracion)}</p>
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
                    <Show cambiarRuta={() => cambiarRuta(item)} />
                )
            }
        </div>
    );
}

export default ElementCard;