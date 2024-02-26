import react from "react";
import { Trash2Fill } from "react-bootstrap-icons";

const Delete = ({ tipo, item }) => {
    return (
        <button
            className={`my-1 mx-1`}
            style={{
                border: "none",
                borderRadius: "20px",
                backgroundColor: "#F45252",
                minWidth: "70px",
            }}
        >
            <div className="d-flex justify-content-center">
                <Trash2Fill color="black" size={40} />
            </div>
        </button>
    );
}

export default Delete;