import React from "react";

const AcceptOrReject = () => {
    return (
        <div className="col-4 px-1 d-flex justify-content-end">
            <button className="my-1 mx-1" style={{ border: "none", borderRadius: "20px", backgroundColor: "#74c87a", minWidth: "70px" }} >
                <img style={{ maxWidth: "50px", maxHeight: "50px" }} src="/Iconos/Icono-Tick.png" alt="" />
            </button>
            <button className="my-1 mx-1" style={{ border: "none", borderRadius: "20px", backgroundColor: "#F45252", minWidth: "70px" }} >
                <img style={{ maxWidth: "70px", maxHeight: "60px" }} src="/Iconos/Icono-X.png" alt="" />
            </button>
        </div>
    );
}

export default AcceptOrReject;