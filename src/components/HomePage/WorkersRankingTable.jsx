import React, { useState, useEffect } from "react";
import axios from "../../lib/axios.jsx"
import RankingWorker from "./RankingWorker.jsx"

const WorkersRankingTable = () => {
    let [workers,setWorkers] = useState([]);

    const topTrabajadores = async () => {
        await axios.get('api/trabajador?top=g&tipo=1', {
         })
             .then(function (response) {
                 setWorkers(response.data.data);
             })
             .catch(function (error) {
                 console.log(error);
             })
             .finally(() => {
                 setIsLoading(false);
               });
     }

    useEffect(() => {
        topTrabajadores();
      }, []);

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