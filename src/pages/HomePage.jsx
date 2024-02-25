import React, { useEffect } from "react";
import { useState } from "react";
import RankingTable from "../components/HomePage/RankingTable";
import SixWorkers from "../components/HomePage/SixWorkers";
import SearchBar from "../components/HomePage/SearchBar";
import ProfessionsList from "../components/HomePage/ProfessionsList";

import axios from "../lib/axios";

const HomePage = () => {
    const [profesiones, setProfesiones] = useState([]);
    const [user, setUser] = useState();
    const [selectedProfessionId, setSelectedProfessionId] = useState(null);

    const handleProfessionClick = (id) => {
        setSelectedProfessionId(id);
    };

    const getUser = async () => {
        try {
            const { data } = await axios.get('/api/user');
            setUser(data);
        }
        catch (e) {
            console.warn('Error ', e);
        }
    };

    const listadoProfesiones = async () => {
        await axios.get('api/profesion', {
        })
            .then(function (response) {
                setProfesiones(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        listadoProfesiones();
    }, [profesiones]);

    useEffect(() => {
        getUser()
    }, [user]);

    return (
        <div className="row d-flex justify-content-center">
            <SearchBar />
            <div className="d-flex col-12 justify-content-center mt-3">
                <ProfessionsList profesiones={profesiones} onProfessionClick={handleProfessionClick} />
            </div>
            <div className="row mt-4">
                <RankingTable selectedProfessionId={selectedProfessionId} />
                <SixWorkers user={user} />
            </div>
        </div>
    );
}

export default HomePage;