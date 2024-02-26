import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { HouseFill, HeartFill, PhoneFill } from 'react-bootstrap-icons';
import BigSpinner from "../ui/BigSpinner";
import axios from "axios";
import Cookies from "js-cookie";

const PersonalInformation = ({ nav, user, handleOpenModal, handleOpenLikeModal }) => {
    let typeUser = useParams().user;
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    const [numeroMeGustas, setNumeroMeGustas] = useState();

    const parts = window.location.pathname.split('/');
    const send = parts[1];

    const guardarMeGusta = async () => {
        const payload = {
            cliente_id: nav.userable_id,
            trabajador_id: user.id,
        }

        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        try {
            console.log(payload);
            await axios.post('api/megusta', payload);
        }
        catch (e) {
            console.warn('Error ', e);
        }
    }

    const getMeGusta = async () => {
        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        try {
            const response = await axios.get('api/megusta');
            setNumeroMeGustas(response.data.data);
        }
        catch (e) {
            console.warn('Error ', e);
        }
    }

    useEffect(() => {
        getMeGusta();
    }, [user])

    if (user == undefined || nav == undefined) {
        return (
            <BigSpinner />
        );
    }

    return (
        <div className="row" style={{ border: "1px solid #74c87a", borderRadius: "20px" }}>
            <div className="text-center py-3">
                {
                    <p className="h5 m-0">{user.user.name + ' ' + user.user.apellido1 + ' ' + user.user.apellido2}</p>
                }
                <div className="d-flex justify-content-center">
                    <img src="/Profile.png" alt="Imagen" className="rounded-circle"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                </div>
                <div className="mt-2 d-flex justify-content-center align-items-center flex-wrap mb-4">
                    {
                        ((typeUser == "worker" && (send != "request" && send != "proposal")) || ((send == "request" && send == "proposal") && typeUser == "client")) ? (
                            <>
                                {user.profesiones.data.map((profesion, index) => (
                                    <div key={index} className="d-inline-block mb-2">
                                        <div className="d-flex justify-content-center align-items-center px-3 py-1 mx-2"
                                            style={{ border: "1px solid #74c87a", borderRadius: "20px", backgroundColor: "#74c87a", color: "black" }}>
                                            <p className="m-0">{profesion.nombre}</p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : null
                    }
                </div>
                {
                    ((typeUser == "worker" && (send != "request" && send != "proposal")) || (send == "request" && typeUser == "client")) ? (
                        <>
                            <div className="d-flex align-items-center ml-3 text-start">
                                <HouseFill color="white" size={20} />
                                <span className="mx-3">{user.user.localidad + ", " + user.user.provincia}</span>
                            </div>
                            <div className="d-flex align-items-center ml-3">
                                <HeartFill color="white" size={20} />

                                <span className="mx-3">{"Le gusta a " + numeroMeGustas + " personas"}</span>
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                {
                                    nav.rol == "cliente" ?
                                        <>
                                            <button className="btn ml-auto mr-4" onClick={handleOpenModal} style={{ color: "black", background: "#74c87a" }}><strong>Contacta</strong></button>
                                            <button className="btn mx-2" onClick={() => guardarMeGusta()} style={{ color: "black", background: "#FC0FC0" }}><strong>Me gusta</strong></button>
                                        </>
                                        : nav.id == user.user.id ?
                                            <Link to={`/edit/profile/${user.user.id}`}>
                                                <button className="btn ml-auto mr-4" style={{ color: "black", background: "#74c87a" }}><strong>Editar</strong></button>
                                            </Link>
                                            : null
                                }
                                <button className="btn mr-auto ml-4" style={{ color: "black", background: "#FF2333" }}><strong>Reportar</strong></button>
                            </div>
                            <div className="text-start mt-3 py-3 px-3" style={{ border: "1px solid #74c87a", borderRadius: "20px" }}>
                                <p>{user.user.descripcion}</p>
                            </div>
                        </>
                    ) : typeUser == "client" || (typeUser == "worker" && (send == "request" || send == "proposal")) ? (
                        <>
                            <div className="d-flex align-items-center ml-3">
                                <HouseFill color="white" size={20} />
                                <span className="mx-3">{user.user.localidad + ", " + user.user.provincia}</span>
                            </div>
                            <div className="d-flex align-items-center ml-3">
                                <PhoneFill color="white" size={20} />
                                <span className="mx-3">{user.user.telefono}</span>
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                {
                                    (nav.rol == "cliente" && nav.id == user.user.id) ?
                                        <Link to={`/edit/profile/${user.user.id}`}>
                                            <button className="btn ml-auto mr-4" style={{ color: "black", background: "#74c87a" }}><strong>Editar</strong></button>
                                        </Link>
                                        : null
                                }
                                <button className="btn mx-2" onClick={() => guardarMeGusta()} style={{ color: "black", background: "#FC0FC0" }}><strong>Me gusta</strong></button>
                                <button className="btn mr-auto ml-4" style={{ color: "black", background: "#FF2333" }}><strong>Reportar</strong></button>
                            </div>
                        </>
                    ) : null
                }
            </div>
        </div>
    );
}

export default PersonalInformation;