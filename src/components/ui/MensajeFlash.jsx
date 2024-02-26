import Swal from 'sweetalert2';
import react from 'react';

const MensajeFlash = (title, mensaje, tipo) => {
    Swal.fire({
        icon: tipo,
        title: title ? title : "Mensaje",
        text: mensaje,
        showConfirmButton: false,
        timer: 2000
    });
};

export default MensajeFlash;