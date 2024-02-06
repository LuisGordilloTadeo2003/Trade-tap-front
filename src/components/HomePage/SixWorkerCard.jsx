import React from "react";

const SixWorkerCard = (props) => {
    return (
        <div className="col-3">
            <div className="foto-worker">

            </div>
            <div style={{ color: "white" }}>
                <h2>{props.worker.nombre}</h2>
            </div>
            <div>
                <h4>{props.worker.valoracion}</h4>
            </div>
        </div>
    );
}

export default SixWorkerCard;