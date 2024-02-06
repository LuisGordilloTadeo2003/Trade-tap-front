import React from "react";

const RankingWorker = (props) => {
    return (
        <div className="row d-flex align-items-end border-bottom border-dark">
            <p className="m-0 col-6"><strong>{props.worker.nombre + " " + props.worker.apellido1 + " " + props.worker.apellido2}</strong></p>
            <p className="m-0 col-6 small">{props.worker.profesion}</p>
            <p className="m-0 small">{props.generarEstrellas(props.worker.valoracion)}</p>
        </div>
    );
}

export default RankingWorker;