import react from "react";
import ProfessionSelected from "../RegisterLogin/ProfessionSelected";

const PersonalInformation = ({ type, worker }) => {

    console.log(worker);


    return (
        <div>
            <p>{worker.user.nombre + ' ' + worker.user.apellido1 + ' ' + worker.user.apellido2}</p>
            <img src="" alt="" />
            <div>
                {
                    worker.profesiones.map((profesion) => {
                        <ProfessionSelected profesion={profesion} />
                    })
                }
            </div>
        </div>
    );
}

export default PersonalInformation;