import react, { useEffect, useState } from "react";
import PersonalInformation from "../components/ProfilePage/PersonalInformation";
import Valoraciones from "../components/ProfilePage/Valoraciones";
import InfoCommision from "../components/ProfilePage/InfoCommision";
import ModalComponent from "../components/ui/ModalComponent";

import axios from "../lib/axios";
import Cookies from "js-cookie";

import { useParams } from "react-router-dom";
import { Result } from "postcss";
import BigSpinner from "../components/ui/BigSpinner";

const CommisionPage = () => {
    const [commision, setCommision] = useState([]);
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();
    let id = useParams().id;
    let typeUser = useParams().user;
    const xsrfToken = Cookies.get('XSRF-TOKEN');

    let url;

    typeUser == "worker" ? url = "cliente" : url = "trabajador";

    useEffect(() => {
        const CommisionData = async () => {
            try {
                const response = await axios.get(`api/encargo/${id}`);
                setCommision(response.data.data);
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

        CommisionData();
    }, [commision]);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (user == undefined && profile == undefined && commision.length == 0) {
        return (
            <BigSpinner />
        )
    }

    return (
        <div className="row mt-3 d-flex justify-content-center">
            <div className="col-3">
                <PersonalInformation nav={user} user={profile} handleOpenModal={handleOpenModal} />
                {/*<Valoraciones />*/}
            </div>

            <InfoCommision nav={user} extra={commision} handleOpenModal={handleOpenModal} />

            <ModalComponent campo={"propuesta"} nav={user} user={profile} showModal={showModal} handleCloseModal={handleCloseModal} />

        </div>
    );
}

export default CommisionPage;