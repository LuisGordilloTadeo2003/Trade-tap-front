import react, { useEffect, useState } from "react";
import PersonalInformation from "../components/ProfilePage/PersonalInformation";
import Valoraciones from "../components/ProfilePage/Valoraciones";
import InfoRequest from "../components/ProfilePage/InfoRequest";

import axios from "../lib/axios";
import Cookies from "js-cookie";

import { useParams } from "react-router-dom";

const RequestPage = () => {
    const [request, setRequest] = useState([]);
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();
    let id = useParams().id;
    let tipo = useParams().tipo;
    let typeUser = useParams().user;
    const xsrfToken = Cookies.get('XSRF-TOKEN');

    let url;

    typeUser == "worker" ? url = "trabajador" : url = "cliente";

    useEffect(() => {
        const RequestData = async () => {
            try {
                const response = await axios.get(`api/solicitud/${id}`);
                setRequest(response.data.data);
                console.log(response.data.data);
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
    }, [request])

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="row mt-3 d-flex justify-content-center">
            <PersonalInformation nav={user} user={profile} handleOpenModal={handleOpenModal} />
            <div className="col-7 d-flex justify-content-center p-3" style={{ border: "1px solid #74c87a", borderRadius: "20px", marginLeft: "50px" }}>
                <InfoRequest extra={request} />
            </div>

            <Valoraciones />
        </div>
    );
}

export default RequestPage;