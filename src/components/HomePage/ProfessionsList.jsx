import React from "react";
import ProfessionName from "./ProfessionName";
import ProfessionIcon from "./ProfessionIcon";

import axios from "axios";

const ProfessionsList = () => {
    let profesiones = [
        "Jardinero",
        "Electricista",
        "Carpintero",
        "Programador",
        "Fontanero",
        "Crupier",
        "Dj",
        "Cocinero",
        "Jamonero",
        "Soldador",
        "Mecanico"
    ]

    return (
        <table>
            {
                profesiones.map((profesion) => {
                    let icono = `/Iconos/Icono-${profesion}.png`;

                    console.log(icono);

                    return (
                        <td style={{ minWidth: "100px", textAlign: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <ProfessionIcon key={profesion} icono={icono} />
                                <ProfessionName key={profesion} profesion={profesion} />
                            </div>
                        </td>

                    )
                })
            }
        </table>
    );
}

export default ProfessionsList;