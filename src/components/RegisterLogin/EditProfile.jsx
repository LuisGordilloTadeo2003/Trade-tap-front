import React, { useState } from "react";
import axios from "axios";

const EditProfilePage = ({ user }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        apellido1: user.apellido1,
        apellido2: user.apellido2,
        email: user.email,
        telefono: user.telefono,
        localidad: user.localidad,
        provincia: user.provincia,
        descripcion: user.descripcion,
        fotoPerfil: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            fotoPerfil: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });
            await axios.put(`/api/user/${user.id}`, formDataToSend);
            alert("Perfil actualizado exitosamente");
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            alert("Error al actualizar el perfil. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div className="col-md-5 p-5 d-flex align-items-center justify-content-center border-custom-registerLogin">
            <form className="pl-3 row g-3" onSubmit={handleSubmit}>
                <h2 className="text-center mb-4 text-white">Editar Perfil</h2>
                <div className="col-md-6">
                    <label className="form-label text-white">Nombre *</label>
                    <input
                        type="text"
                        className="form-control custom-input"
                        name="name"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label text-white">Apellido *</label>
                    <input
                        type="text"
                        className="form-control custom-input"
                        name="apellido"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label text-white">Correo electrónico *</label>
                    <input
                        type="email"
                        className="form-control custom-input"
                        name="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label text-white">Dirección *</label>
                    <input
                        type="text"
                        className="form-control custom-input"
                        name="direccion"
                        placeholder="Dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                </div>
                {/* Otros campos según sea necesario */}
                <div className="col-md-6">
                    <label className="form-label text-white">Subir Foto de Perfil</label>
                    <input
                        type="file"
                        className="form-control custom-input"
                        name="profilePic"
                        onChange={(e) => handleProfilePicChange(e)}
                    />
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;
