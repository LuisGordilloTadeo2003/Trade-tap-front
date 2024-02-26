import React from "react";

const RankingWorker = ({ worker, generarEstrellas, idTrabajo }) => {

    console.log(worker);

    return (
        worker.profesiones.data.map((profesion) => {
            if (profesion.id == idTrabajo) {
                console.log("entra");

                return (
                    <div className="row d-flex align-items-end border-bottom border-dark">
                        <p className="m-0 col-8"><strong>{worker.user.name + " " + worker.user.apellido1 + " " + worker.user.apellido2}</strong></p>
                        <p className="m-0 col-6 small">{profesion.nombre}</p>
                        <p className="m-0 col-6 small d-flex justify-content-end">{generarEstrellas(5)}</p>
                    </div>
                );
            }
        })
    );

}

export default RankingWorker;