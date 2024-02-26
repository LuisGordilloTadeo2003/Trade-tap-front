import react from "react";

const InfoCommision = ({ extra, handleOpenModal }) => {
    console.log(extra);
    return (
        <div className="col-7 d-flex flex-column p-2" style={{ border: "1px solid #74c87a", borderRadius: "20px", marginLeft: "50px" }}>
            <div className="row" style={{ height: "10%" }}>
                <p className="h2 text-center">Encargo</p>
            </div>
            <div className="row d-flex align-items-center mb-2 mx-3 py-3 px-1" style={{ height: "15%", border: "1px solid #74c87a", borderRadius: "20px" }}>
                <p className="h4">{extra.titulo}</p>
            </div>
            <div className="row mx-3 mb-2 py-3 px-1" style={{ height: "30%", border: "1px solid #74c87a", borderRadius: "20px" }}>
                <p>{extra.descripcion}</p>
            </div>
            <div className="row mx-3 mb-2 py-3 px-1" style={{ height: "15%", border: "1px solid #74c87a", borderRadius: "20px" }}>
                <p>{extra.presupuesto + " €"}</p>
            </div>
            <div className="row mx-3 py-3 px-1" style={{ height: "15%", border: "1px solid #74c87a", borderRadius: "20px" }}>
                <div className="col-6">
                    <p>{extra.fecha_estimada_inicio}</p>
                </div>
                <div className="col-6">
                    <p>{extra.fecha_estimada_final}</p>
                </div>
            </div>
        </div>

    );
}

export default InfoCommision;