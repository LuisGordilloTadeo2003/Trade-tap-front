import React, { useState, useEffect } from "react";
import ProfessionName from "./ProfessionName";
import ProfessionIcon from "./ProfessionIcon";
import axios from "../../lib/axios";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const ProfessionsList = ({ onProfessionClick }) => {
    const [profesiones, setProfesiones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [transitionDirection, setTransitionDirection] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para controlar si se están cargando los datos

    const fetchProfessions = async (page) => {
        try {
            const response = await axios.get(`api/profesion?list=true&page=${page}`);
            setProfesiones(response.data.data);
            setCurrentPage(response.data.meta.current_page);
            setTotalPages(response.data.meta.last_page);
            console.log(response.data.data);
            setLoading(false);
            setTransitionDirection(null);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setTransitionDirection("left");
            fetchProfessions(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setTransitionDirection("right");
            fetchProfessions(currentPage - 1);
        }
    };

    useEffect(() => {
        fetchProfessions(currentPage);
    }, [currentPage]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="professions-list">
            <button className={`transition-${transitionDirection}`} onClick={handlePreviousPage} disabled={currentPage === 1}><AiOutlineLeft /></button>
            <table>
                {profesiones.map((profesion) => (
                    <td key={profesion.id} style={{ minWidth: "100px", textAlign: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <ProfessionIcon
                                icono={`/Iconos/Icono-${profesion.nombre}.png`}
                                onClick={() => onProfessionClick(profesion.id)}
                            />
                            <ProfessionName profesion={profesion.nombre} />
                        </div>
                    </td>
                ))}
            </table>
            <button className={`transition-${transitionDirection}`} onClick={handleNextPage} disabled={currentPage === totalPages}><AiOutlineRight /></button>
        </div>
    );
};

export default ProfessionsList;
