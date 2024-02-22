import React from "react";

import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

const AcceptOrReject = ({ onAccept, onReject }) => {
    const handleAccept = () => {
        onAccept(true);
    };

    const handleReject = () => {
        onReject(true);
    }

    return (
        <div className="col-4 px-1 d-flex justify-content-end">
            <button className="my-1 mx-1" onClick={handleAccept} style={{ border: "none", borderRadius: "20px", backgroundColor: "#74c87a", minWidth: "70px" }} >
                <div className="d-flex justify-content-center">
                    <CheckCircleFill color="black" size={40} />
                </div>
            </button>
            <button className="my-1 mx-1" onClick={handleReject} style={{ border: "none", borderRadius: "20px", backgroundColor: "#F45252", minWidth: "70px" }} >
                <div className="d-flex justify-content-center">
                    <XCircleFill color="black" size={40} />
                </div>
            </button>
        </div>
    );
}

export default AcceptOrReject;