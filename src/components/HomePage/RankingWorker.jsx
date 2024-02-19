import React from "react";

const RankingWorker = (props) => {
    return (
        <div className="row d-flex align-items-end border-bottom border-dark">
            <p className="m-0 col-6"><strong>{props.worker.user.nombre + " " + props.worker.user.apellido1 + " " + props.worker.user.apellido2}</strong></p>
            <p className="m-0 col-6 small">{props.worker.profesiones.data[0].nombre}</p>
            <p className="m-0 small">{props.generarEstrellas(props.worker.valoracion)}</p>
        </div>
    );
}

export default RankingWorker;