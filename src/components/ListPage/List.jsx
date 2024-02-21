/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ElementCard from "./ElementCard";
import BigSpinner from "../ui/BigSpinner";
import SearchBar from "../HomePage/SearchBar";
import ProfessionIcon from "../HomePage/ProfessionIcon";
import ProfessionName from "../HomePage/ProfessionName";
import axios from "../../lib/axios";
import { useState, useEffect } from "react";


const List = ({ data, tipo }) => {
    let [profesiones, setProfesiones] = useState([]);
    const [pendiente, setPendiente] = useState(true);
    const [solicitudesFiltradas, setSolicitudesFiltradas] = useState([]);


    const listadoProfesiones = async () => {
        await axios.get('api/profesion', {
        })
            .then(function (response) {
                setProfesiones(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        listadoProfesiones();
    }, []);

    if (data == undefined) {
        return (
            <BigSpinner />
        );
    }

    const togglePendiente = (nuevoEstado) => {
        setPendiente(nuevoEstado);
        const filtradas = data.filter(item => {
            return nuevoEstado ? item.estado === "Aceptado" : item.estado !== "Aceptado";
        });
        setSolicitudesFiltradas(filtradas);
    };

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
                        >
                            <p className="h4">Mis solicitudes</p>
                        </div>
                        <div
                            className={`col-6 d-flex justify-content-center border-bottom ${!pendiente ? 'selected' : ''}`}
                            onClick={() => { togglePendiente(false) }}
                        >
                            <p className="h4">Mis solicitudes pendientes</p>
                        </div>
                    </div>
                ) : tipo == "proposal" ? (
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center border-bottom">
                            <p className="h4">Mis propuestas</p>
                        </div>
                        <div className="col-6 d-flex justify-content-center border-bottom">
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
                        {
                            profesiones.map((profesion) => {
                                return (
                                    <tr>
                                        <td className="p-2">
                                            <ProfessionIcon
                                                key={profesion.nombre}
                                                icono={`/Iconos/Icono-${profesion.nombre}.png`}
                                                onClick={() => onProfessionClick(profesion.id)} // Llamamos a la función de devolución de llamada con el ID de la profesión
                                            />
                                        </td>
                                        <td className="p-2">
                                            <p className="pl-1 text-start" style={{ fontSize: "20px", marginTop: "3px" }}>{profesion.nombre}</p>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </table>
                </div>
                <div className="col-9">
                    {
                        tipo == "request" ? (
                            solicitudesFiltradas.map((item, index) => (
                                <ElementCard key={item.id} item={item} index={index} tipo={tipo} />
                            ))
                        ) : tipo == "worker" ? (
                            data.map((item, index) => {
                                return <ElementCard key={item.id} item={item} index={index} tipo={tipo} />
                            })
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
}

export default List;