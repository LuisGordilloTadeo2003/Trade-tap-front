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

    const cambiarRuta = () => {
        window.location.pathname = '/';
        console.log('Cambiando la ruta...');
    };

    return (
        <div>
            <div key={index} className="row d-flex mx-5 my-3" style={{ border: "2px solid #74c87a", borderRadius: "20px" }}>
                <div className="col-1 d-flex align-items-center justify-content-center">
                    <img style={{ maxWidth: "100px", maxHeight: "100px" }} src={item.foto} alt="" />
                </div>
                <div className="col-7 px-4 align-self-center">
                    <h5>
                        {
                            tipo === "workers" ? (
                                <span>{item.name + ' ' + item.apellido1 + ' ' + item.apellido2}{generarEstrellas(item.valoracion)}</span>
                            ) : tipo === "request" || tipo === "proposal" ? (
                                <span>{item.titulo}</span>
                            ) :
                                null
                        }
                    </h5>
                    <h6>
                        {
                            tipo === "workers" ? (
                                <span>{item.descripcion}</span>
                            ) : (
                                <span>{item.cliente.name + ' ' + item.cliente.apellido1 + ' ' + item.cliente.apellido2}</span>
                            )
                        }
                    </h6>
                </div>
                {
                    tipo === "proposal" ? (
                        <AcceptOrReject />
                    ) : (
                        <Show cambiarRuta={cambiarRuta} />
                    )
                }
            </div>
        </div>
    );
}

export default ElementCard;