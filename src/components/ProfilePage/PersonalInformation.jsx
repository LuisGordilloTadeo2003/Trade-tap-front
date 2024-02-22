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

    if (user == undefined || nav == undefined) {
        return (
            <BigSpinner />
        );
    }

<<<<<<< HEAD
=======
    let tipo = useParams().tipo;

>>>>>>> 90fc12e79b44017b0cb3de890eb0f643982c9e9c
    return (
        <div className="col-3" style={{ border: "1px solid #74c87a", borderRadius: "20px" }}>
            <div className="text-center py-3">
                {
                    typeUser == "worker" ? (
                        <p className="h5 m-0">{user.user.name + ' ' + user.user.apellido1 + ' ' + user.user.apellido2}</p>
                    ) : typeUser === "client" ? (
                        <p className="h5 m-0">{user.user.name + ' ' + user.user.apellido1 + ' ' + user.user.apellido2}</p>
                    ) : null
                }
                <div className="d-flex justify-content-center">
                    <img src="/Profile.png" alt="Imagen" className="rounded-circle"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                </div>
                <div className="mt-2 d-flex justify-content-center align-items-center flex-wrap mb-4">
                    {
<<<<<<< HEAD
                        typeUser === "worker" ? (
                            <>
                                {user.profesiones.data.map((profesion, index) => (
                                    <div key={index} className="d-inline-block mb-2">
                                        <div className="d-flex justify-content-center align-items-center px-3 py-1 mx-2"
                                            style={{ border: "1px solid #74c87a", borderRadius: "20px", backgroundColor: "#74c87a", color: "black" }}>
                                            <p className="m-0">{profesion.nombre}</p>
                                        </div>
                                    </div>
                                ))}
=======
                        tipo === "profile" && (
                            <>
                                <p className="h5 m-0">{user.user.name + ' ' + user.user.apellido1 + ' ' + user.user.apellido2}</p>
                            </>
                        )
                    }
                    {
                        (tipo === "request" || tipo === "proposal") && (
                            <>
                                <p className="h5 m-0">{user.cliente.user.name + ' ' + user.cliente.user.apellido1 + ' ' + user.cliente.user.apellido2}</p>
                            </>
                        )
                    }
                    <div className="d-flex justify-content-center">
                        <img src="/Profile.png" alt="Imagen" className="rounded-circle"
                            style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                    </div>
                    <div className="mt-2 d-flex justify-content-center align-items-center flex-wrap mb-4">
                        {
                            tipo === "profile" && (
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
                            )
                        }
                        {
                            (tipo === "request" || tipo === "proposal") && (
                                <>
                                </>
                            )
                        }
                    </div>
                    {
                        tipo === "profile" && (
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
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        Iusto quod earum est quia vel quibusdam culpa voluptas magni.
                                        Quaerat consequatur alias delectus esse repudiandae nemo veritatis rerum vel, ratione autem.
                                    </p>
                                </div>
>>>>>>> 90fc12e79b44017b0cb3de890eb0f643982c9e9c
                            </>
                        ) : null
                    }
                </div>
                {
                    typeUser === "worker" ? (
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
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    Iusto quod earum est quia vel quibusdam culpa voluptas magni.
                                    Quaerat consequatur alias delectus esse repudiandae nemo veritatis rerum vel, ratione autem.
                                </p>
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