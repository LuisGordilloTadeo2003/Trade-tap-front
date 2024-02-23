import React from "react";
import AcceptOrReject from "./AcceptOrReject";
import Show from "./Show";

import axios from "../../lib/axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

const ElementCard = ({ item, user, index, tipo }) => {
    const xsrfToken = Cookies.get('XSRF-TOKEN');

    const generarEstrellas = (valoracion) => {
        const estrellas = [];
        for (let j = 1; j <= valoracion; j++) {
            estrellas.push(<span key={j}>⭐</span>);
        }
        return estrellas;
    };

    let rol;
    user.rol == "trabajador" ? rol = "worker" : rol = "client";

    const cambiarRuta = (item) => {
        switch (tipo) {
            case 'request':
                window.location.assign(`/request/${rol}/${item.id}`);
                break;
            case 'proposal':
                window.location.assign(`/proposal/${rol}/${item.id}`);
                break;
            case 'reserves':
                window.location.assign(`/reserves/${rol}/${item.id}`);
                break;
            case 'commisions':
                window.location.assign(`/commisions/${rol}/${item.id}`);
                break;
            case 'workers':
                window.location.assign(`/profile/worker/${item.id}`);
                break;

            default:
                break;
        }

    };

    const aceptarSolicitud = async () => {
        const payload = {
            descripcion: item.descripcion,
            titulo: item.titulo,
            trabajador_id: item.trabajador.user.userable_id,
            cliente_id: item.cliente.user.userable_id,
            estado: "Aceptado"
        };

        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        try {
            await axios.put(`api/solicitud/${item.id}`, payload)
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
            }
            else {
                console.warn(e);
            }
        }
    }

    const rechazarSolicitud = async () => {
        const payload = {
            descripcion: item.descripcion,
            titulo: item.titulo,
            trabajador_id: item.trabajador.user.userable_id,
            cliente_id: item.cliente.user.userable_id,
            estado: "Rechazado"
        };

        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        try {
            await axios.put(`api/solicitud/${item.id}`, payload)
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
            }
            else {
                console.warn(e);
            }
        }
    }

    const handleAccept = (accepted) => {
        if (accepted && tipo == "request") {
            aceptarSolicitud();

            console.log(item);
        }
    };

    const handleReject = (Reject) => {
        if (Reject && tipo == "request") {
            rechazarSolicitud();

            console.log(item);
        }
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
                            {
                                user.rol == "cliente" ? (
                                    <p className="h6">{item.trabajador.user.name + ' ' + item.trabajador.user.apellido1 + ' ' + item.trabajador.user.apellido2}</p>
                                ) : (
                                    <p className="h6">{item.cliente.user.name + ' ' + item.cliente.user.apellido1 + ' ' + item.cliente.user.apellido2}</p>
                                )
                            }

                        </>
                    )
                }
            </div>

            {
                ((tipo == "request" || tipo == "proposal") && item.estado == "Pendiente" && user.rol == "trabajador") ? (
                    <AcceptOrReject onAccept={handleAccept} onReject={handleReject} />
                ) : (
                    <Show cambiarRuta={() => cambiarRuta(item)} />
                )
            }
        </div >
    );
}

export default ElementCard;