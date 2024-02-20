export default function BigSpinner() {
    return (
        <div className="d-flex justify-content-center ">
            <span className="ring-r rounded-full border-3 border-r-transparent border-indigo-300 animate-spin"
                style={{ width: "250px", height: "250px" }}
            ></span>
        </div>
    );
}