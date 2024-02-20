/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PersonalInformation from "../components/ProfilePage/PersonalInformation";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const [result, setResult] = useState()
    let id = useParams().id;
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`api/trabajador/${id}`);
                setResult(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [id]);

    console.log(result);

    return (
        <div>
            <PersonalInformation user={result} />
        </div>
    );
}

export default ProfilePage;