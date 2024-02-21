import React, { useState, useEffect } from "react";
import ProfessionName from "./ProfessionName";
import ProfessionIcon from "./ProfessionIcon";
import axios from "../../lib/axios";

const ProfessionsList = ({ onProfessionClick }) => {
    let [profesiones, setProfesiones] = useState([]);

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

    console.log(profesiones)

    return (
        <table>
            {
                profesiones.map((profesion) => {
                    return (
                        <td style={{ minWidth: "100px", textAlign: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <ProfessionIcon
                                    key={profesion.nombre}
                                    icono={`/Iconos/Icono-${profesion.nombre}.png`}
                                    onClick={() => onProfessionClick(profesion.id)} // Llamamos a la función de devolución de llamada con el ID de la profesión
                                />
                                <ProfessionName key={profesion.id} profesion={profesion.nombre} />
                            </div>
                        </td>

                    )
                })
            }
        </table>
    );
}

export default ProfessionsList;