import React from "react";
import SixWorkerCard from "./SixWorkerCard";

const SixWorkers = () => {
    let workers = [];

    for (let i = 0; i < 6; i++) {
        let worker = {
            id: i,
            nombre: "Luis",
            apellido1: "Gordillo",
            apellido2: "Tadeo",
            profesion: "Programador",
            valoracion: Math.floor(Math.random() * 5 + 1)
        }

        workers.push(worker);
    }

    return (
        <div className="col-8 d-flex justify-content-end">
            {
                workers.map(worker => {
                    //return <SixWorkerCard key={worker.id} worker={worker} />
                })
            }
        </div>
    );
}

export default SixWorkers;