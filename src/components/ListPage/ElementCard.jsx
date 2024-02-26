import React, { useEffect } from "react";
import AcceptOrReject from "./AcceptOrReject";
import Show from "./Show";
import { useState } from "react";

import axios from "../../lib/axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import MensajeFlash from "../ui/MensajeFlash";
import Deliver from "./Deliver";
import Delete from "./Delete";

const ElementCard = ({ userData, item, user, index, tipo }) => {
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    const [isLoading, setIsLoading] = useState(false)

    const generarEstrellas = (valoracion) => {
        const estrellas = [];
        for (let j = 1; j <= valoracion; j++) {
            estrellas.push(<span key={j}>⭐</span>);
        }
        return estrellas;
    };

    let rol;
    user.rol == "trabajador" ? rol = "worker" : rol = "client";
    console.log(userData);
    console.log(item);

    const cambiarRuta = (item) => {
        if (userData) {
            switch (tipo) {
                case 'request':
                    if (user.rol == "trabajador") window.location.assign(`/request/${rol}/${item.id}/${item.cliente_id}`);
                    if (user.rol == "cliente") window.location.assign(`/request/${rol}/${item.id}/${userData.id}`);
                    break;
                case 'proposal':
                    if (user.rol == "trabajador") window.location.assign(`/request/${rol}/${item.id}/${item.cliente_id}`);
                    if (user.rol == "cliente") window.location.assign(`/request/${rol}/${item.id}/${userData.id}`);
                    break;
                case 'reserves':
                    if (user.rol == "trabajador") window.location.assign(`/request/${rol}/${item.id}/${item.cliente_id}`);
                    if (user.rol == "cliente") window.location.assign(`/request/${rol}/${item.id}/${userData.id}`);
                    break;
                case 'commisions':
                    if (user.rol == "trabajador") window.location.assign(`/request/${rol}/${item.id}/${item.cliente_id}`);
                    if (user.rol == "cliente") window.location.assign(`/request/${rol}/${item.id}/${userData.id}`);
                    break;
                case 'workers':
                    window.location.assign(`/profile/worker/${item.id}`);
                    break;
                default:
                    break;
            }
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
            MensajeFlash('Solicitud aceptada correctamente', 'success')
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

    let insert;
    item.tipo == "Encargo" ? insert = "encargo" : insert = "reserva";

    const aceptarPropuesta = async () => {
        const payload = {
            descripcion: item.descripcion,
            titulo: item.titulo,
            trabajador_id: item.trabajador.user.userable_id,
            cliente_id: item.cliente.user.userable_id,
            presupuesto: item.presupuesto,
            fecha_estimada_inicio: item.fecha_estimada_inicio,
            fecha_estimada_final: item.fecha_estimada_final,
            tipo: insert,
            estado: "Aceptado"
        };

        const encargo = {
            descripcion: item.descripcion,
            titulo: item.titulo,
            trabajador_id: item.trabajador.user.userable_id,
            cliente_id: item.cliente.user.userable_id,
            fecha_estimada_inicio: item.fecha_estimada_inicio,
            fecha_estimada_final: item.fecha_estimada_final,
            presupuesto: item.presupuesto,
            tipo: insert,
            estado: "Pendiente"
        }

        console.log(encargo)

        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        try {
            await axios.put(`api/propuesta/${item.id}`, payload)
            await axios.post(`api/encargo`, encargo)
            MensajeFlash('Solicitud aceptada correctamente', 'success')
            await axios.delete(`api/propuesta/${item.id}`);
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

    const rechazar = async () => {
        let campo;
        let msg;

        switch (tipo) {
            case "request":
                campo = "solicitud";
                msg = "Solicitud eliminada correctamente"
                break;
            case "proposal":
                campo = "propuesta";
                msg = "Propuesta eliminada correctamente"
                break;
            default:
                break;
        }

        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        try {
            await axios.delete(`api/${campo}/${item.id}`)
            MensajeFlash(msg, 'success')
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

    console.log(item);

    const encargoEntregado = async () => {
        const payload = {
            descripcion: item.descripcion,
            titulo: item.titulo,
            trabajador_id: item.trabajador.user.userable_id,
            cliente_id: item.cliente.user.userable_id,
            fecha_estimada_inicio: item.fecha_estimada_inicio,
            fecha_estimada_final: item.fecha_estimada_final,
            presupuesto: item.presupuesto,
            estado: "Entregado"
        };

        const servicio = {
            coste: item.presupuesto,
            serviciable_id: item.id,
            serviciable_type: item.tipo === 'encargo' ? `App\\Models\\Encargo` : 'App\\Models\\Reserva',
        };

        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        console.log(payload);
        console.log(servicio);

        try {
            await axios.put(`api/encargo/${item.id}`, payload)
            MensajeFlash('Encargo entregado correctamente', 'success')
            await axios.post(`api/servicio`, servicio);
            MensajeFlash("Por fin avanzas gilipollas", "success");
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
        } else if (accepted && tipo == "proposal") {
            aceptarPropuesta();
        }
    };

    const handleReject = (reject) => {
        if (reject) {
            rechazar(tipo);
        }
    };

    const handleAcceptCommission = () => {
        encargoEntregado();
    };

    if (userData) {
        return (
            <div key={index} className="row d-flex mx-5 my-3" style={{ border: "2px solid #74c87a", borderRadius: "20px" }}>
                <div className="col-1 d-flex align-items-center justify-content-center">
                    <img style={{ maxWidth: "100px", maxHeight: "100px" }} src="/Profile.png" alt="" />
                </div>
                <div className="col-7 d-block px-4 align-self-center">
                    {
                        tipo == "workers" && (
                            <>
                                <p className="h5">{item.user.name + ' ' + item.user.apellido1 + ' ' + item.user.apellido2}{generarEstrellas(item.valoracion)}</p>
                                <p className="h6">{item.descripcion}</p>
                            </>
                        )
                    }
                    {
                        (tipo == "request" || tipo == "proposal" || tipo == "reserves" || tipo == "commisions") && (
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
                </div> {/* user.userable_id */}
                {
                    (((tipo == "request" && user.rol == "trabajador") || (tipo == "proposal" && user.rol == "cliente")) && item.estado == "Pendiente") ? (
                        <AcceptOrReject onAccept={handleAccept} onReject={handleReject} />
                    ) : tipo == "commisions" ?
                        <>
                            <Deliver onAccept={handleAcceptCommission} />
                            <Delete />
                        </>
                        : (
                            <>
                                <Show cambiarRuta={() => cambiarRuta(item)} />
                                <Delete />
                            </>
                        )
                }
            </div >
        );
    } else {
        return null
    }

}

export default ElementCard;