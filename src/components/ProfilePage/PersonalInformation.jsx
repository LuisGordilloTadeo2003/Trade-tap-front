import React from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { HouseFill } from 'react-bootstrap-icons';
import { HeartFill } from 'react-bootstrap-icons';
import BigSpinner from "../ui/BigSpinner";

const PersonalInformation = ({ nav, user, handleOpenModal }) => {
    if (user == undefined || nav == undefined) {
        return (
            <BigSpinner />
        );
    }

    return (
        <div className="row mt-3 d-flex justify-content-center">
            <div className="col-3" style={{ border: "1px solid #74c87a", borderRadius: "20px" }}>
                <div className="text-center py-3">
                    <p className="h5 m-0">{user.user.nombre + ' ' + user.user.apellido1 + ' ' + user.user.apellido2}</p>
                    <div className="d-flex justify-content-center">
                        <img src="/Profile.png" alt="Imagen" className="rounded-circle"
                            style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                    </div>
                    <div className="mt-2 d-flex justify-content-center align-items-center flex-wrap mb-4">
                        {user.profesiones.data.map((profesion, index) => (
                            <div key={index} className="d-inline-block mb-2">
                                <div className="d-flex justify-content-center align-items-center px-3 py-1 mx-2"
                                    style={{ border: "1px solid #74c87a", borderRadius: "20px", backgroundColor: "#74c87a", color: "black" }}>
                                    <p className="m-0">{profesion.nombre}</p>
                                </div>
                            </div>
                        ))}
                    </div>
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
                </div>
            </div>

            {/* ------Componente------ */}
            <div className="col-7 d-flex justify-content-center p-3" style={{ border: "1px solid #74c87a", borderRadius: "20px", marginLeft: "50px" }}>
                <p className="h2 mt-1">Publicaciones</p>
            </div>
            {/* ---------------------- */}

            {/* ------Componente------ */}
            <div className="col-3" style={{ border: "1px solid #74c87a", borderRadius: "20px", marginLeft: "50px" }}>

            </div>
            {/* ---------------------- */}

        </div>
    );
}

export default PersonalInformation;