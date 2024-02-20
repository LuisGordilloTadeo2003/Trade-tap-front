import React from "react";

const RankingWorker = (props) => {
    return (
        <div className="row d-flex align-items-end border-bottom border-dark">
            <p className="m-0 col-8"><strong>{props.worker.user.nombre + " " + props.worker.user.apellido1 + " " + props.worker.user.apellido2}</strong></p>
            <p className="m-0 col-6 small">{props.worker.profesiones.data[0].nombre}</p>
            <p className="m-0 col-6 small d-flex justify-content-end">{props.generarEstrellas(5)}</p>
        </div>
    );
}

export default RankingWorker;