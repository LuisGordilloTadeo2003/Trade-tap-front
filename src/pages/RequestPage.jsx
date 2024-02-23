import react, { useEffect, useState } from "react";
import PersonalInformation from "../components/ProfilePage/PersonalInformation";
import Valoraciones from "../components/ProfilePage/Valoraciones";
import InfoRequest from "../components/ProfilePage/InfoRequest";
import ModalComponent from "../components/ui/ModalComponent";

import axios from "../lib/axios";
import Cookies from "js-cookie";

import { useParams } from "react-router-dom";
import { Result } from "postcss";
import BigSpinner from "../components/ui/BigSpinner";

const RequestPage = () => {
    const [request, setRequest] = useState([]);
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();
    let id = useParams().id;
    let tipo = useParams().tipo;
    let typeUser = useParams().user;
    const xsrfToken = Cookies.get('XSRF-TOKEN');

    let url;

    typeUser == "worker" ? url = "cliente" : url = "trabajador";

    useEffect(() => {
        const RequestData = async () => {
            try {
                const response = await axios.get(`api/solicitud/${id}`);
                setRequest(response.data.data);
            } catch (e) {
                if (typeof e === 'object' && e !== null && 'response' in e) {
                    console.warn(e.response.data);
                }
                else {
                    console.warn(e);
                }
            }
        }

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

        RequestData();
    }, [request]);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (user == undefined && profile == undefined && request.length == 0) {
        return (
            <BigSpinner />
        )
    }

    return (
        <div className="row mt-3 d-flex justify-content-center">
            <div className="col-3">
                <PersonalInformation nav={user} user={profile} handleOpenModal={handleOpenModal} />
                <Valoraciones />
            </div>

            <InfoRequest extra={request} handleOpenModal={handleOpenModal} />

            <ModalComponent tipo={"propuesta"} nav={user} user={profile} showModal={showModal} handleCloseModal={handleCloseModal} />

        </div>
    );
}

export default RequestPage;