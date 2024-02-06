import react from "react";
import { useState } from "react";
import ProfessionSelected from "./ProfessionSelected";

const RegisterWorker = ({ cif, setCif, profesiones, setProfesiones }) => {
    const [profesionSeleccionada, setProfesionSeleccionada] = useState('');

    const profesion = [
        "jardinero",
        "electricista",
        "carpintero",
        "programador",
        "fontanero",
        "crupier",
        "dj",
        "cocinero",
        "jamonero",
        "soldador",
        "mecanico"
    ];

    const opcionesDisponibles = profesion.filter(profesion => {
        return !profesiones.some(prof => prof.nombre === profesion);
    });

    const añadirProfesion = (e, selectedIndex) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado del evento
        const nuevaProfesion = e.target.value;

        let profession = {
            id: selectedIndex,
            nombre: nuevaProfesion
        }

        if (!profesiones.includes(nuevaProfesion)) {
            // Solo añade la profesión si no está ya en la lista
            setProfesiones([...profesiones, profession]);
        }

        console.log(profesiones);
    }

    return (
        <>
            <div className="col-md-6">
                <label className="form-label text-white">CIF *</label>
                <input
                    type="text"
                    className="form-control custom-input"
                    name="cif"
                    placeholder='CIF'
                    value={cif}
                    onChange={(e) => setCif(e.target.value)}
                />
            </div>
            <div className="col-md-6">
                <label className="form-label text-white">Profesiones *</label>
                <select
                    className="form-control custom-input"
                    name="profesion"
                    placeholder="Selecciona profesiones"
                    value={profesiones}
                    onChange={(e) => añadirProfesion(e, e.target.selectedIndex)}
                >
                    <option value="">Elige profesión</option>
                    {opcionesDisponibles.map((profesion, index) => (
                        <option key={index} id={index} value={profesion}>{profesion}</option>
                    ))}
                </select>
            </div >
            {
                profesiones.map((profesionSeleccionada, index) => {
                    return <ProfessionSelected key={index} profesion={profesionSeleccionada} />
                })
            }
        </>
    );
}

export default RegisterWorker;