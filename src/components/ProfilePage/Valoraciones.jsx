import react from "react";
import { useParams } from "react-router-dom";

const Valoraciones = ({ valoraciones }) => {
    let typeUser = useParams().user;

    const generarEstrellas = (valoracion) => {
        const estrellas = [];
        for (let j = 1; j <= valoracion; j++) {
            estrellas.push(<span key={j}>⭐</span>);
        }
        return estrellas;
    };

    return (
        <div className="row mt-3 d.flex justify-content-center" style={{ border: "1px solid #74c87a", borderRadius: "20px", height: "300px" }}>
            <div className="col">
                {valoraciones.map((valoracion, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        {
                            typeUser == "worker" ?
                                <p>{valoracion.cliente.name + " " + valoracion.cliente.apellido1 + " " + valoracion.cliente.apellido2}</p>
                                :
                                <p>{valoracion.trabajador.name + " " + valoracion.trabajador.apellido1 + " " + valoracion.trabajador.apellido2}</p>
                        }
                        <p>{generarEstrellas(valoracion.valoracion)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Valoraciones;