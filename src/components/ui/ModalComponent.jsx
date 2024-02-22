import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

import axios from '../../lib/axios';
import Cookies from 'js-cookie';

const ModalComponent = ({ showModal, handleCloseModal, nav, user }) => {
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    let [descripcion, setDescripcion] = useState();
    let [titulo, setTitulo] = useState();

    if (user == undefined || nav == undefined) {
        return (
            <></>
        );
    }

    const trabajador_id = user.id;
    const cliente_id = nav.id;
    const estado = 'Pendiente';

    console.log(nav)
    console.log(user);

    const enviarSolicitud = async () => {
        const payload = {
            descripcion,
            titulo,
            trabajador_id,
            cliente_id,
            estado
        };

        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        try {
            await axios.post('api/solicitud', payload)
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
            }
            else {
                console.warn(e);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        enviarSolicitud();
        handleCloseModal();
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Enviar Solicitud</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Título de la Solicitud</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Descripción de la Solicitud</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Ingrese la descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </Form.Group>

                    <div className="col-12 my-2 px-3 d-flex justify-content-center">
                        <button onClick={handleCloseModal} className="my-1 mx-1" style={{ border: "none", borderRadius: "20px", backgroundColor: "#F45252", minWidth: "70px" }} >
                            <div className="d-flex justify-content-center py-3 px-3">
                                <XCircleFill color="black" size={50} />
                            </div>
                        </button>
                        <button type='submit' className="my-1 mx-1" style={{ border: "none", borderRadius: "20px", backgroundColor: "#74c87a", minWidth: "70px" }} >
                            <div className="d-flex justify-content-center py-3 px-3">
                                <CheckCircleFill color="black" size={50} />
                            </div>
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalComponent;