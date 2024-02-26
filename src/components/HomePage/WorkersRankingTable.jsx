import React, { useState, useEffect } from "react";
import axios from "../../lib/axios.jsx"
import RankingWorker from "./RankingWorker.jsx"
import BigSpinner from "../ui/BigSpinner.jsx";

const WorkersRankingTable = ({ id }) => {
    let [workers, setWorkers] = useState([]);

    console.log(id);

    const topTrabajadores = async () => {
        await axios.get(`api/trabajador?top=g&tipo=${id}`, {
        })
            .then(function (response) {
                setWorkers(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        if (id) {
            topTrabajadores();
        }
    }, [id]);

    workers.sort((a, b) => b.valoracion - a.valoracion);

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
                                <RankingWorker idTrabajo={id} worker={worker} generarEstrellas={generarEstrellas} />
                            </td>
                        </tr>
                    )
                })
            }
        </>
    );
}

export default WorkersRankingTable;