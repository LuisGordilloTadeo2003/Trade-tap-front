import react from "react";
import { useState } from "react";

const RegisterWorker = () => {
    const [cif, setCif] = useState('');
    const [profesiones, setProfesiones] = useState([]);

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

    const añadirProfesion = (e) => {
        setProfesiones(...profesiones, e);
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
                    onChange={(e) => añadirProfesion(e.target.value)}
                >
                    <option value="">Elige profesión</option>
                    {profesion.map((profesion, index) => (
                        <option key={index} value={profesion} className="custom-option">{profesion}</option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default RegisterWorker;