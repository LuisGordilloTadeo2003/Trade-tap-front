import React from "react";
import ProfessionSelected from "../RegisterLogin/ProfessionSelected";

const PersonalInformation = ({ worker }) => {
    if (worker == undefined) {
        return <div>Loading...</div>; // Muestra un mensaje de carga mientras los datos se están cargando
    }

    return (
        <div className="">
            <p>{worker.user.nombre + ' ' + worker.user.apellido1 + ' ' + worker.user.apellido2}</p>
            <img src="" alt="" />
            <div>
                {
                    worker.profesiones.data.map((profesion, index) => (
                        <ProfessionSelected key={index} profesion={profesion} />
                    ))
                }
            </div>
            <p>{worker.user.localidad + ", " + worker.user.provincia}</p>
        </div>
    );
}

export default PersonalInformation;