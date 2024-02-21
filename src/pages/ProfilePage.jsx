/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PersonalInformation from "../components/ProfilePage/PersonalInformation";
import ModalComponent from "../components/ui/ModalComponent";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

const ProfilePage = () => {
    const [result, setResult] = useState()
    const [user, setUser] = useState();
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    let id = useParams().id;
    let tipo = useParams().tipo;

    
    useEffect(() => {
        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        const ProfileData = async () => {
            switch (tipo) {
                case 'request':
                    try {
                        const response = await axios.get(`api/solicitud/${id}`);
                        setResult(response.data.data);
                    } catch (e) {
                        if (typeof e === 'object' && e !== null && 'response' in e) {
                            console.warn(e.response.data);
                        }
                        else {
                            console.warn(e);
                        }
                    }
                    break;
                case 'profile':
                    try {
                        const response = await axios.get(`api/trabajador/${id}`);
                        setResult(response.data.data);
                    } catch (e) {
                        if (typeof e === 'object' && e !== null && 'response' in e) {
                            console.warn(e.response.data);
                        }
                        else {
                            console.warn(e);
                        }
                    }
                    break;
                default:
                    break;
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