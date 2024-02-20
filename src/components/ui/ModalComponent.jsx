import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

import axios from '../../lib/axios';

const ModalComponent = ({ showModal, handleCloseModal }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        handleCloseModal();

        axios.post('')
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
                        <Form.Control type="text" placeholder="Ingrese el título" />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Descripción de la Solicitud</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Ingrese la descripción" />
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