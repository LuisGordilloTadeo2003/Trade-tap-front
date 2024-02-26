import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";

const LikeModalComponent = ({ showLikeModal, handleCloseLikeModal }) => {
    const [selectedStars, setSelectedStars] = useState(0);

    const handleStarClick = (index) => {
        setSelectedStars(index + 1);
    };

    const handleAccept = () => {

        handleCloseLikeModal();
    };

    return (
        <Modal show={showLikeModal} onHide={handleCloseLikeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Me gusta</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                {[...Array(5)].map((_, index) => (
                    index < selectedStars ? (
                        <StarFill
                            key={index}
                            style={{ fontSize: '3rem', color: '#FFFF00', cursor: 'pointer' }}
                            onClick={() => handleStarClick(index)}
                        />
                    ) : (
                        <Star
                            key={index}
                            style={{ fontSize: '3rem', color: '#FFFF00', cursor: 'pointer' }}
                            onClick={() => handleStarClick(index)}
                        />
                    )
                ))}
            </Modal.Body>
            <Modal.Footer>
                <button variant="secondary" onClick={handleCloseLikeModal}>Cerrar</button>
                <button className="btn btn-primary" onClick={handleAccept}>Aceptar</button>
            </Modal.Footer>
        </Modal>
    );
}

export default LikeModalComponent;
