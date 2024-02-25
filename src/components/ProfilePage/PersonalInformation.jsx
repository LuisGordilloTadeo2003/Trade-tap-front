import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { HouseFill } from 'react-bootstrap-icons';
import { HeartFill } from 'react-bootstrap-icons';
import BigSpinner from "../ui/BigSpinner";

const PersonalInformation = ({ nav, user, handleOpenModal }) => {
    let tipo = useParams().tipo;
    let typeUser = useParams().user;

    const parts = window.location.pathname.split('/');
    const send = parts[1];

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
                    ((typeUser == "worker" && send != "request") || (send == "request" && typeUser == "client")) ? (
                        <>
                            <div className="d-flex align-items-center ml-3">
                                <HouseFill color="white" size={20} />
                                <span className="mx-3">{user.user.localidad + ", " + user.user.provincia}</span>
                            </div>
                            <div className="d-flex align-items-center ml-3">
                                <HeartFill color="white" size={20} />

                                <span className="mx-3">{"Le gusta a " + user.valaracionesTotales + " personas"}</span>
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                {nav.rol == "cliente" ? <button className="btn ml-auto mr-4" onClick={handleOpenModal} style={{ color: "black", background: "#74c87a" }}><strong>Contacta</strong></button> : <></>}
                                <button className="btn mx-2" style={{ color: "black", background: "#FC0FC0" }}><strong>Me gusta</strong></button>
                                <button className="btn mr-auto ml-4" style={{ color: "black", background: "#FF2333" }}><strong>Reportar</strong></button>
                            </div>
                            <div className="text-start mt-3 py-3 px-3" style={{ border: "1px solid #74c87a", borderRadius: "20px" }}>
                                <p>{user.user.descripcion}</p>
                            </div>
                        </>
                    ) : typeUser == "client" ? (
                        <div className="d-flex align-items-center ml-3">
                            <HouseFill color="white" size={20} />
                            <span className="mx-3">{user.user.localidad + ", " + user.user.provincia}</span>
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
}

export default PersonalInformation;