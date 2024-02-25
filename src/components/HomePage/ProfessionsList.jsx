import React, { useState, useEffect } from "react";
import ProfessionName from "./ProfessionName";
import ProfessionIcon from "./ProfessionIcon";
import axios from "../../lib/axios";

const ProfessionsList = ({ profesiones, onProfessionClick }) => {


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