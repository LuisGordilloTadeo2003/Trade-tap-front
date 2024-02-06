import React from "react";

const ProfessionIcon = ({ icono }) => {
    return (
        <button className="p-2 d-flex justify-content-center align-items-center btn-profession" style={{ borderRadius: "50%", border: "none" }}>
            <img style={{ maxWidth: "30px", maxHeight: "30px" }} src={icono} alt="profesión"></img>
        </button>
    );
}

export default ProfessionIcon;