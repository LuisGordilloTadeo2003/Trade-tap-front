import React from "react";

const SixWorkerCard = ({ worker }) => {
    const generarEstrellas = (valoracion) => {
        const estrellas = [];
        for (let j = 1; j <= valoracion; j++) {
            estrellas.push(<span key={j}>⭐</span>);
        }
        return estrellas;
    };

    return (
        <div className="d-flex flex-column align-items-center" style={{ border: "2px solid #74c87a", borderRadius: "20px", padding: "10px", margin: "10px" }}>
            <div className="foto-worker" style={{ width: "100px", height: "100px", background: "url('ruta-a-tu-imagen')", backgroundSize: "cover", borderRadius: "50%", marginBottom: "10px" }}></div>
            <div style={{ color: "white", textAlign: "center" }}>
                <h2>{worker.nombre + " " + worker.apellido1 + " " + worker.apellido2}</h2>
            </div>
            <div style={{ textAlign: "center" }}>
                <h4>{generarEstrellas(worker.valoracion)}</h4>
            </div>
        </div>
    );
}

export default SixWorkerCard;