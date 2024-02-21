import React from "react";
import { useState } from "react";
import RankingTable from "../components/HomePage/RankingTable";
import SixWorkers from "../components/HomePage/SixWorkers";
import SearchBar from "../components/HomePage/SearchBar";
import ProfessionsList from "../components/HomePage/ProfessionsList";

const HomePage = () => {
    const [selectedProfessionId, setSelectedProfessionId] = useState(null);

    const handleProfessionClick = (id) => {
        setSelectedProfessionId(id);
    };

    return (
        <div className="row d-flex justify-content-center">
            <SearchBar />
            <div className="d-flex col-12 justify-content-center mt-3">
                <ProfessionsList onProfessionClick={handleProfessionClick} />
            </div>
            <div className="row mt-4">
                <RankingTable selectedProfessionId={selectedProfessionId} />
                <SixWorkers />
            </div>
        </div>
    );
}

export default HomePage;