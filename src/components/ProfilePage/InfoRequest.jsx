import react from "react";

const InfoRequest = ({ extra }) => {
    console.log(extra);

    return (
        <div>
            <p className="h2 mt-1">Solicitud</p>
            {/*<p>{extra.titulo}</p>
            <p>{extra.descripcion}</p>*/}
        </div>

    );
}

export default InfoRequest;