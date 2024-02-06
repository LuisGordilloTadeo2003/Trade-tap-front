import react from "react";

const ProfessionSelected = ({ profesion }) => {
    return (
        <div className="col-3 d-flex justify-content-center mx-2 text-dark" style={{ border: "1px solid #74c87a", borderRadius: "20px", backgroundColor: "#74c87a" }}>
            <p>{profesion.nombre}</p>
        </div>
    );
}

export default ProfessionSelected;