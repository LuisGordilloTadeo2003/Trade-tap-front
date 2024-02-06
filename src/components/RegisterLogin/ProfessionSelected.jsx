import react from "react";

const ProfessionSelected = ({ profesion }) => {
    return (
        <div
            style={{ border: "1px solid #74c87a" }}>
            <p>{profesion.nombre}</p>
        </div>
    );
}

export default ProfessionSelected;