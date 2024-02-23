import react from "react";

const InfoRequest = ({ extra, handleOpenModal }) => {
    return (
        <div className="col-7 d-flex flex-column p-2" style={{ border: "1px solid #74c87a", borderRadius: "20px", marginLeft: "50px" }}>
            <div className="row" style={{ height: "10%" }}>
                <p className="h2 text-center">Solicitud</p>
            </div>
            <div className="row d-flex align-items-center mb-2 mx-3 py-3 px-1" style={{ height: "15%", border: "1px solid #74c87a", borderRadius: "20px" }}>
                <p className="h4">{extra.titulo}</p>
            </div>
            <div className="row mx-3 py-3 px-1" style={{ height: "60%", border: "1px solid #74c87a", borderRadius: "20px" }}>
                <p>{extra.descripcion}</p>
            </div>
            <div className="row d-flex justify-content-center align-items-center" style={{ height: "15%" }}>
                <button className="btn" onClick={handleOpenModal} style={{ width: "30%", borderRadius: "30px", color: "black", background: "#74c87a" }}><strong>Contacta</strong></button>
            </div>
        </div>

    );
}

export default InfoRequest;