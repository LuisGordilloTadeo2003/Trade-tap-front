/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ElementCard from "./ElementCard";
import BigSpinner from "../ui/BigSpinner";
import SearchBar from "../HomePage/SearchBar";
import ProfessionIcon from "../HomePage/ProfessionIcon";
import axios from "../../lib/axios";
import { useState, useEffect } from "react";


const List = ({ profesiones, filtroProfesion, data, tipo, user }) => {

    const [pendiente, setPendiente] = useState(true);
    const [Filtradas, setFiltradas] = useState([]);

    useEffect(() => {
        const filtradas = data.filter(item => {
            return pendiente ? item.estado === "Aceptado" : item.estado !== "Aceptado";
        });

        setFiltradas(filtradas);

    }, [profesiones]);

    const togglePendiente = (nuevoEstado) => {

        const filtradas = data.filter(item => {
            return nuevoEstado ? item.estado === "Aceptado" : item.estado !== "Aceptado";
        });

        setFiltradas(filtradas);
        setPendiente(nuevoEstado);
    };

    if (data.length == 0 || user == undefined) {
        return (
            <BigSpinner />
        );
    }

    return (
        <div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <SearchBar />
                </div>
            </div>
            {
                tipo == "request" ? (
                    <div className="row my-4">
                        <div
                            className={`col-6 d-flex justify-content-center border-bottom ${pendiente ? 'selected' : ''}`}
                            onClick={() => { togglePendiente(true) }}
                            style={{ cursor: "pointer" }}
                        >
                            <p className="h4">Mis solicitudes</p>
                        </div>
                        <div
                            className={`col-6 d-flex justify-content-center border-bottom ${!pendiente ? 'selected' : ''}`}
                            onClick={() => { togglePendiente(false) }}
                            style={{ cursor: "pointer" }}
                        >
                            <p className="h4">Mis solicitudes pendientes</p>
                        </div>
                    </div>
                ) : tipo == "proposal" ? (
                    <div className="row my-4">
                        <div
                            className={`col-6 d-flex justify-content-center border-bottom ${pendiente ? 'selected' : ''}`}
                            onClick={() => { togglePendiente(true) }}
                            style={{ cursor: "pointer" }}
                        >
                            <p className="h4">Mis propuestas</p>
                        </div>
                        <div
                            className={`col-6 d-flex justify-content-center border-bottom ${!pendiente ? 'selected' : ''}`}
                            onClick={() => { togglePendiente(false) }}
                            style={{ cursor: "pointer" }}
                        >
                            <p className="h4">Mis propuestas pendientes</p>
                        </div>
                    </div>
                ) : (
                    null
                )
            }
            <div className="row">
                <div className="col-2" style={{ marginLeft: "50px" }}>
                    <table>
                        <tbody>
                            {
                                profesiones.map((profesion) => {
                                    return (
                                        <tr key={profesion.id}>
                                            <td className="p-2">
                                                <ProfessionIcon
                                                    key={profesion.nombre}
                                                    icono={`/Iconos/Icono-${profesion.nombre}.png`}
                                                /*onClick={() => onProfessionClick(profesion.id)}*/ // Llamamos a la función de devolución de llamada con el ID de la profesión
                                                />
                                            </td>
                                            <td className="p-2">
                                                <p className="pl-1 text-start" style={{ fontSize: "20px", marginTop: "3px" }}>{profesion.nombre}</p>
                                            </td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-9 mt-3">
                    {
                        tipo == "request" || tipo == "proposal" ? (
                            Filtradas.map((item, index) => (
                                <ElementCard key={item.id} item={item} user={user} index={index} tipo={tipo} />
                            ))
                        ) : tipo == "workers" ? (
                            data.map((item, index) => {
                                return <ElementCard key={item.id} item={item} user={user} index={index} tipo={tipo} />
                            })
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
}

export default List;