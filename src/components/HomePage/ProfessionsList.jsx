import React, { useState, useEffect } from "react";
import ProfessionName from "./ProfessionName";
import ProfessionIcon from "./ProfessionIcon";
import axios from "../../lib/axios";

const ProfessionsList = () => {
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
                    let icono = `/Iconos/Icono-${profesion.nombre}.png`;

                    console.log(icono);

                    return (
                        <td style={{ minWidth: "100px", textAlign: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <ProfessionIcon key={profesion.nombre} icono={icono} />
                                <ProfessionName key={profesion.nombre} profesion={profesion.nombre} />
                            </div>
                        </td>

                    )
                })
            }
        </table>
    );
}

export default ProfessionsList;