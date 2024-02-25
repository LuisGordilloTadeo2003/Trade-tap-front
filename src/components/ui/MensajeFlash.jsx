import Swal from 'sweetalert2';
import react from 'react';

const MensajeFlash = (mensaje, tipo) => {
    Swal.fire({
        icon: tipo,
        title: 'Mensaje Flash',
        text: mensaje,
        showConfirmButton: false,
        timer: 2000
    });
};

export default MensajeFlash;