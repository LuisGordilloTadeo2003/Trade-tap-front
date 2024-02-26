/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PersonalInformation from "../components/ProfilePage/PersonalInformation";
import ModalComponent from "../components/ui/ModalComponent";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Publicaciones from "../components/ProfilePage/Publicaciones";
import Valoraciones from "../components/ProfilePage/Valoraciones";
import InfoRequest from "../components/ProfilePage/InfoRequest";
import BigSpinner from "../components/ui/BigSpinner";
import LikeModalComponent from "../components/ui/LikeModalComponent";
import PublicacionModalComponent from "../components/ui/PublicacionModalComponent";
import CalendarWork from "../components/ProfilePage/CalendarWork";

const ProfilePage = () => {
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    let id = useParams().id;
    let tipo = useParams().tipo;
    let typeUser = useParams().user;

    let url;

    typeUser == "worker" ? url = "trabajador" : url = "cliente";

    useEffect(() => {
        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        const UserData = async () => {
            try {
                const response = await axios.get(`api/${url}/${id}`);
                setProfile(response.data.data);
            } catch (e) {
                if (typeof e === 'object' && e !== null && 'response' in e) {
                    console.warn(e.response.data);
                }
                else {
                    console.warn(e);
                }
            }
        }

        UserData();

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
    const [showLikeModal, setShowLikeModal] = useState(false);
    const [showPublicacionModal, setShowPublicacionModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleCloseLikeModal = () => setShowLikeModal(false);
    const handleShowLikeModal = () => setShowLikeModal(true);

    const handleShowPublicacionModal = () => setShowPublicacionModal(true);
    const handleClosePublicacionModal = () => setShowPublicacionModal(true);

    if (profile == undefined && user == undefined) {
        <BigSpinner />
    }

    console.log(user);
    console.log(profile);

    return (
        <div className="row mt-3 d-flex justify-content-center">
            <div className="col-3">
                {
                    user && profile ? (
                        user.id == profile.user.id ? (
                            <div className="d-flex justify-content-center">
                                <button className="btn mb-2" onClick={handleShowPublicacionModal} style={{ color: "black", background: "#74c87a" }}><strong>Nueva Publicación</strong></button>
                            </div>
                        ) : null
                    ) : null
                }
                <PersonalInformation nav={user} user={profile} handleOpenModal={handleOpenModal} handleOpenLikeModal={handleShowLikeModal} />
                {
                    user && profile ? (
                        user.id == profile.user.id ? (
                            <CalendarWork />
                        ) : <Valoraciones />
                    ) : null
                }
            </div>

            <Publicaciones />

            <LikeModalComponent showLikeModal={showLikeModal} handleCloseLikeModal={handleCloseLikeModal} user={user} />
            <ModalComponent campo={"solicitud"} nav={user} user={profile} showModal={showModal} handleCloseModal={handleCloseModal} />
            <PublicacionModalComponent nav={user} showPublicacionModal={showPublicacionModal} handleClosePublicacionModal={handleClosePublicacionModal} />
        </div>
    );
}

export default ProfilePage;