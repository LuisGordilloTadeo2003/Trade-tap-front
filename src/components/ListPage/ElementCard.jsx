import React from "react";
import AcceptOrReject from "./AcceptOrReject";
import Show from "./Show";

import axios from "../../lib/axios";
import Cookies from 'js-cookie';

const ElementCard = ({ item, index, tipo }) => {
    const xsrfToken = Cookies.get('XSRF-TOKEN');

    const generarEstrellas = (valoracion) => {
        const estrellas = [];
        for (let j = 1; j <= valoracion; j++) {
            estrellas.push(<span key={j}>⭐</span>);
        }
        return estrellas;
    };

    const cambiarRuta = (item) => {
        switch (tipo) {
            case 'request':
                window.location.assign(`/request/client/${item.id}`);
                break;
            case 'proposal':

                break;
            case 'reserves':

                break;
            case 'commisions':

                break;

            default:
                window.location.assign(`/profile/worker/${item.id}`);
                break;
        }

    };

    const aceptarSolicitud = async () => {
        const payload = {
            descripcion: item.descripcion,
            titulo: item.titulo,
            trabajador_id: item.trabajador.user.id,
            cliente_id: item.cliente.user.id,
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

    const handleAccept = (accepted) => {
        if (accepted && tipo == "request") {
            aceptarSolicitud();

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
                            <p className="h6">{item.cliente.user.name + ' ' + item.cliente.user.apellido1 + ' ' + item.cliente.user.apellido2}</p>
                        </>
                    )
                }
            </div>

            {
                tipo == "request" && item.estado == "Pendiente" ? (
                    <AcceptOrReject onAccept={handleAccept} />
                ) : (
                    <Show cambiarRuta={() => cambiarRuta(item)} />
                )
            }
        </div>
    );
}

export default ElementCard;