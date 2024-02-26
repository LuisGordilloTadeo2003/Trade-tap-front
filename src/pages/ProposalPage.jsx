import react, { useEffect, useState } from "react";
import PersonalInformation from "../components/ProfilePage/PersonalInformation";
import Valoraciones from "../components/ProfilePage/Valoraciones";
import InfoProposal from "../components/ProfilePage/InfoProposal";
import ModalComponent from "../components/ui/ModalComponent";

import axios from "../lib/axios";
import Cookies from "js-cookie";

import { useParams } from "react-router-dom";
import { Result } from "postcss";
import BigSpinner from "../components/ui/BigSpinner";

const RequestPage = () => {
    const [proposal, setProposal] = useState([]);
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();
    let id = useParams().id;
    let userDataId = useParams().userId;
    let typeUser = useParams().user;
    const xsrfToken = Cookies.get('XSRF-TOKEN');

    let url;

    typeUser == "worker" ? url = "cliente" : url = "trabajador";

    useEffect(() => {
        const ProposalData = async () => {
            try {
                const response = await axios.get(`api/propuesta/${id}`);
                setProposal(response.data.data);
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
                const response = await axios.get(`api/${url}/${userDataId}`);
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

        ProposalData();
    }, [proposal]);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (user == undefined && profile == undefined && proposal.length == 0) {
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

            <InfoProposal extra={proposal} />

            <ModalComponent tipo={"propuesta"} nav={user} user={profile} showModal={showModal} handleCloseModal={handleCloseModal} />

        </div>
    );
}

export default RequestPage;