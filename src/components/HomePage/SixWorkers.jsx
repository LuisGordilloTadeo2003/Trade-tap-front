import React, { useState, useEffect } from "react";
import SixWorkerCard from "./SixWorkerCard";

import axios from "../../lib/axios";
import BigSpinner from "../ui/BigSpinner";

const SixWorkers = ({ user }) => {
    const [workers, setWorkers] = useState([]);

    const sixWorkers = async () => {
        await axios.get(`api/trabajador?cerca=${user.localidad}`, {
        })
            .then(function (response) {
                setWorkers(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        sixWorkers();
    }, [workers]);

    console.log(user);

    // for (let i = 0; i < 6; i++) {
    //     let worker = {
    //         id: i,
    //         nombre: "Luis",
    //         apellido1: "Gordillo",
    //         apellido2: "Tadeo",
    //         profesion: "Programador",
    //         valoracion: Math.floor(Math.random() * 5 + 1)
    //     }

    //     workers.push(worker);
    // }

    if (workers.length == 0) {
        return (
            <BigSpinner />
        )
    }

    return (
        <></>
        // <div className="col-8">
        //     <div className="row">
        //         <div className="col-4">
        //             <SixWorkerCard key={workers[0].id} worker={workers[0]} />
        //         </div>
        //         <div className="col-4">
        //             <SixWorkerCard key={workers[1].id} worker={workers[1]} />
        //         </div>
        //         <div className="col-4">
        //             <SixWorkerCard key={workers[2].id} worker={workers[2]} />
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-4">
        //             <SixWorkerCard key={workers[3].id} worker={workers[3]} />
        //         </div>
        //         <div className="col-4">
        //             <SixWorkerCard key={workers[4].id} worker={workers[4]} />
        //         </div>
        //         <div className="col-4">
        //             <SixWorkerCard key={workers[5].id} worker={workers[5]} />
        //         </div>
        //     </div>
        // </div>
    );
}

export default SixWorkers;