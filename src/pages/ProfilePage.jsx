/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PersonalInformation from "../components/ProfilePage/PersonalInformation";
import ModalComponent from "../components/ui/ModalComponent";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const [result, setResult] = useState()
    const [user, setUser] = useState();
    let id = useParams().id;
    console.log(id);

    useEffect(() => {
        const ProfileData = async () => {
            try {
                const response = await axios.get(`api/trabajador/${id}`);
                setResult(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        ProfileData();

        const getUser = async () => {
            try {
                const { data } = await axios.get('/api/user');
                setUser(data);
            }
            catch (e) {
                console.warn('Error ', e);
            }
        };

        getUser();
    }, [id]);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <PersonalInformation nav={user} user={result} handleOpenModal={handleOpenModal} />
            <ModalComponent nav={user} user={result} showModal={showModal} handleCloseModal={handleCloseModal} />
        </div>
    );
}

export default ProfilePage;