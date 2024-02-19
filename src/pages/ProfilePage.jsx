import React from "react";
import PersonalInformation from "../components/ProfilePage/PersonalInformation";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import { useEffect, useState } from "react";

const ProfilePage = ({ type }) => {
    const [results, setResults] = useState([]);
    let id = useParams().id;
    console.log(id);

    useEffect(() => {
        console.log(`api/trabajador/${id}`)

        const fetchData = async () => {
            try {
                const response = await axios.get(`api/trabajador/1`)
                console.log(`api/trabajador/${id}`)
                setResults(response.data.data);
            } catch (error) {
                console.error('Error al realizar la búsqueda:', error);
            }
        };

        fetchData();

    }, []);

    console.log(results);

    return (
        type == "worker" ? (
            <div>
                <PersonalInformation type={type} worker={results} />
            </div>
        ) : null
    );
}

export default ProfilePage;