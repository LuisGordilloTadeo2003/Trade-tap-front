import React, { useState, useEffect } from "react";
import SixWorkerCard from "./SixWorkerCard";

import axios from "../../lib/axios";
import BigSpinner from "../ui/BigSpinner";

const SixWorkers = ({ user }) => {
    const [workers, setWorkers] = useState([]);

    const sixWorkers = async () => {
        if (user) await axios.get(`api/trabajador?cerca=${user.localidad}`, {
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
    }, [user]);

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

    console.log(workers)

    if (workers.length == 0) {
        return (
            <></>
        )
    } else {
        return (
            <div className="col-8">
                {workers.map((worker, index) => (
                    (index % 3 === 0) && <div key={index} className="row">
                        {workers.slice(index, index + 3).map((worker, subIndex) => (
                            <div key={subIndex} className="col-4">
                                <SixWorkerCard worker={worker} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default SixWorkers;