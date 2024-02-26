import react from "react";
import { Trash2Fill } from "react-bootstrap-icons";

const Delete = ({ onAccept }) => {
    return (
        <div className="col-4 px-1 d-flex justify-content-end">
            <button
                className={`my-1 mx-1`}
                style={{
                    border: "none",
                    borderRadius: "20px",
                    backgroundColor: "#F45252",
                    minWidth: "70px",
                }}
                onClick={onAccept}
            >
                <div className="d-flex justify-content-center">
                    <Trash2Fill color="black" size={40} />
                </div>
            </button>
        </div>
    );
}

export default Delete;