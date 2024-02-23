import react, { useEffect, useState } from "react";
import PersonalInformation from "../components/ProfilePage/PersonalInformation";
import Valoraciones from "../components/ProfilePage/Valoraciones";
import InfoRequest from "../components/ProfilePage/InfoRequest";
import ModalComponent from "../components/ui/ModalComponent";

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
    }, [request]);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="row mt-3 d-flex justify-content-center">
            <PersonalInformation nav={user} user={profile} />
            <div className="col-7 d-flex flex-column p-3" style={{ border: "1px solid #74c87a", borderRadius: "20px", marginLeft: "50px" }}>
                <InfoRequest extra={request} />
                <div className="row" style={{ height: "10%" }}> {/* Ocupa el 10% */}
                    <p className="h2 mt-1 text-center">Solicitud</p>
                </div>
                <div className="row mb-2 mx-3 py-3 px-1" style={{ height: "15%", border: "1px solid #74c87a", borderRadius: "20px" }}> {/* Ocupa el 20% */}
                    <p>{request.titulo}</p>
                </div>
                <div className="row mx-3 py-3 px-1" style={{ height: "60%", border: "1px solid #74c87a", borderRadius: "20px" }}> {/* Ocupa el 70% */}
                    <p>{request.descripcion}</p>
                </div>
                <div className="row mx-3 py-3 px-1 align-items-center" style={{ height: "15%", width: "10%" }}>
                    <button className="btn ml-auto mr-4" onClick={handleOpenModal} style={{ borderRadius: "30px", color: "black", background: "#74c87a" }}><strong>Contacta</strong></button>
                </div>
            </div>

            <Valoraciones />

            <ModalComponent tipo={"propuesta"} nav={user} user={profile} showModal={showModal} handleCloseModal={handleCloseModal} />

        </div>
    );
}

export default RequestPage;