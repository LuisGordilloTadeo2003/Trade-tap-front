import react from "react";
import { SendDashFill } from "react-bootstrap-icons";
import Spinner from "../ui/Spinner";

const Deliver = ({ onAccept }) => {
    return (
        <div className="col-4 px-1 d-flex justify-content-end">
            <button
                className={`my-1 mx-1`}
                style={{
                    border: "none",
                    borderRadius: "20px",
                    backgroundColor: "#74c87a",
                    minWidth: "70px",
                }}
                onClick={onAccept}
            >
                <div className="d-flex justify-content-center">
                    <SendDashFill color="black" size={40} />
                </div>
            </button>
        </div>
    );
}

export default Deliver;