import react from "react";
import { useState, useEffect } from "react";
import axios from '../../lib/axios';
import ProfessionSelected from "./ProfessionSelected";

const RegisterWorker = ({ cif, setCif, profesiones, setProfesiones }) => {
    const [profesionSeleccionada, setProfesionSeleccionada] = useState('');
    const [profesion, setProfesion] = useState([]);
    const [nombreProfesion, setNombreProfesion] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const profesionesbase = async () => {
       await axios.get('api/profesion', {
        })
            .then(function (response) {
                setProfesion(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
              });
    }

    useEffect(() => {
        profesionesbase();
      }, []);

    const opcionesDisponibles = profesion.filter(profesion => {
        return !profesiones.some(prof => prof.nombre === profesion);
    });

    const añadirProfesion = (e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado del evento
        const nuevaProfesion = e.target.value;

        let profession = {
            id: e.target.selectedIndex,
            nombre: nuevaProfesion
        }


        if (!profesiones.some(prof => prof.id === e.target.selectedIndex)) {
            // Solo añade la profesión si no está ya en la lista
            setProfesiones([...profesiones, e.target.selectedIndex]);
        }
        
        if (!nombreProfesion.some(prof => prof.nombre === nuevaProfesion)) {
            // Solo añade la profesión si no está ya en la lista
            setNombreProfesion([...nombreProfesion, profession]);
        }

        setProfesionSeleccionada(nuevaProfesion);
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
                    value={profesionSeleccionada}
                    onChange={añadirProfesion}
                >
                    <option value="">Elige profesión</option>
                    {opcionesDisponibles.map((profesion) => (
                        <option key={profesion.id} id={profesion.id} value={profesion.nombre}> {profesion.nombre} </option>
                    ))}
                </select>
            </div >
            {
                nombreProfesion.map((profesionSeleccionada) => {
                    return <ProfessionSelected key={profesion.id} profesion={profesionSeleccionada} />
                })
            }
        </>
    );
}

export default RegisterWorker;