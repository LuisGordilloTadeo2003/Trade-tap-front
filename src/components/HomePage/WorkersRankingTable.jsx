import React from "react";
import RankingWorker from "./RankingWorker.jsx"

const WorkersRankingTable = () => {
    const workers = [];

    for (let i = 0; i < 10; i++) {
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

    workers.sort((a, b) => b.valoracion - a.valoracion);

    console.log(workers);

    const generarEstrellas = (valoracion) => {
        const estrellas = [];
        for (let j = 1; j <= valoracion; j++) {
            estrellas.push(<span key={j}>⭐</span>);
        }
        return estrellas;
    };

    return (
        <>
            {
                workers.map((worker) => {
                    return (
                        <tr key={worker.id}>
                            <td>
                                <RankingWorker worker={worker} generarEstrellas={generarEstrellas} />
                            </td>
                        </tr>
                    )
                })
            }
        </>
    );
}

export default WorkersRankingTable;