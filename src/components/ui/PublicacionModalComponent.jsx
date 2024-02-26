import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const PublicacionModalComponent = ({ nav, showPublicacionModal, handleClosePublicacionModal }) => {
    const [foto, setFoto] = useState(null);

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        console.log(file.name);
        setFoto(file.name);
    };

    const handleSubmit = async () => {
        // Aquí puedes enviar la foto al servidor o realizar otras acciones
        console.log("Foto seleccionada:", foto);

        const payload = {
            url: foto,
            trabajador_id: nav.id
        }

        console.log(payload);

        try {
            const response = await axios.post("/api/publicacion", payload);

            console.log("Publicación guardada:", response.data);
            handleClosePublicacionModal();
        } catch (error) {
            console.error("Error al guardar la publicación:", error);
        }
    };

    return (
        <Modal show={showPublicacionModal} onHide={handleClosePublicacionModal}>
            <Modal.Header closeButton>
                <Modal.Title>Subir Publicación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="foto" className="form-label">
                            Foto:
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="foto"
                            onChange={handleFotoChange}
                        />
                    </div>
                    <Button variant="primary" onClick={handleSubmit}>
                        Publicar
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default PublicacionModalComponent;
