import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill, PlusCircleFill, DashCircleFill } from 'react-bootstrap-icons';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import axios from '../../lib/axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const ModalComponent = ({ tipo, showModal, handleCloseModal, nav, user }) => {
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    let [descripcion, setDescripcion] = useState();
    let [titulo, setTitulo] = useState();
    const [tableData, setTableData] = useState([{ cantidad: "", descripcionCorta: "", presupuesto: 0 }]);
    const [presupuestoTotal, setPresupuestoTotal] = useState(0);
    const [trabajo, setTrabajo] = useState("encargo");

    const parts = window.location.pathname.split('/');
    const send = parts[1];

    if (user == undefined || nav == undefined) {
        return (
            <></>
        );
    }

    const trabajador_id = user.id;
    const cliente_id = nav.userable_id;
    const estado = 'Pendiente';

    let payload;

    if (tipo == "solicitud") {
        payload = {
            descripcion,
            titulo,
            trabajador_id,
            cliente_id,
            estado
        };
    } else if (tipo == "propuesta") {
        payload = {};
    }

    const enviarSolicitud = async () => {
        /*
        const payload = {
            descripcion,
            titulo,
            trabajador_id,
            cliente_id,
            estado
        };
*/

        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        try {
            await axios.post(`api/${tipo}`, payload)
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
            }
            else {
                console.warn(e);
            }
        }
    }

    const enviarPropuesta = async () => {

        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        try {
            await axios.post(`api/${tipo}`, payload)
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
            }
            else {
                console.warn(e);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (send == "profile") {
            enviarSolicitud();
        } else if (send == "request") {
            enviarPropuesta();
        }
        obtenerDescripcionesCortas();
        handleCloseModal();
    };

    const handleAddRow = () => {
        setTableData([...tableData, { cantidad: "", descripcionCorta: "", presupuesto: 0 }]);
    };

    const handleRemoveRow = (index) => {
        // Comprobar que haya más de una fila antes de eliminar
        if (tableData.length > 1) {
            const updatedData = tableData.filter((_, i) => i !== index);
            setTableData(updatedData);
            recalculateTotal(updatedData);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newData = [...tableData];
        newData[index][name] = value;
        setTableData(newData);
        recalculateTotal(newData);
    };

    const recalculateTotal = (data) => {
        const total = data.reduce((acc, curr) => acc + parseFloat(curr.presupuesto), 0);
        setPresupuestoTotal(total);
    };

    const obtenerDescripcionesCortas = () => {
        // Obtener todas las descripciones cortas
        const descripcionesCortas = tableData.map(row => row.descripcionCorta);

        // Unir las descripciones cortas en un solo string separado por " - "
        const descripcionCompleta = descripcionesCortas.join(" - ");

        console.log(descripcionCompleta);

        return descripcionCompleta;
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                {
                    send == "profile" ? (
                        <Modal.Title>Enviar Solicitud</Modal.Title>
                    ) : send == "request" ? (
                        <Modal.Title>Enviar Propuesta</Modal.Title>
                    ) : null
                }
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {
                        send == "profile" ? (
                            <>
                                <Form.Group controlId="title">
                                    <Form.Control type="text" placeholder="Ingrese el título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="description" className='my-3'>
                                    <Form.Control as="textarea" rows={3} placeholder="Ingrese la descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                </Form.Group>
                            </>
                        ) : send == "request" ? (
                            <>
                                <Form>
                                    <Form.Group controlId="titulo">
                                        <Form.Control type="text" placeholder="Ingrese el título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="description" className='my-3'>
                                        <Form.Control as="textarea" rows={3} placeholder="Ingrese la descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group controlId="trabajo">
                                        <Form.Label>Trabajo:</Form.Label>
                                        <Form.Check
                                            type="radio"
                                            name="trabajo"
                                            id="encargo"
                                            label="Encargo"
                                            checked={trabajo === 'encargo'}
                                            onChange={() => setTrabajo('encargo')}
                                        />
                                        <Form.Check
                                            type="radio"
                                            name="trabajo"
                                            id="reserva"
                                            label="Reserva"
                                            checked={trabajo === 'reserva'}
                                            onChange={() => setTrabajo('reserva')}
                                        />
                                    </Form.Group>

                                    {/* Calendario para fechas estimadas de entrega */}
                                    {trabajo === 'encargo' && (
                                        <Form.Group controlId="fechasEntrega">
                                            <Form.Label>Fechas estimadas de entrega:</Form.Label>
                                            <FullCalendar
                                                plugins={[dayGridPlugin]}
                                                initialView="dayGridMonth"
                                            // Añade más propiedades y eventos según sea necesario
                                            />
                                        </Form.Group>
                                    )}

                                    {/* Calendario para horarios de reserva */}
                                    {trabajo === 'reserva' && (
                                        <Form.Group controlId="horarios">
                                            <Form.Label>Horarios de reserva:</Form.Label>
                                            <FullCalendar
                                                plugins={[dayGridPlugin]}
                                                initialView="dayGridMonth"
                                            // Añade más propiedades y eventos según sea necesario
                                            />
                                        </Form.Group>
                                    )}

                                    {/* Botones para agregar y eliminar filas */}
                                    <div className="d-flex justify-content-between">
                                        <Button onClick={handleAddRow} className="my-1 mx-1" style={{ border: "none", borderRadius: "20px", backgroundColor: "#74c87a", minWidth: "20px" }}>
                                            <PlusCircleFill color="black" size={20} />
                                        </Button>
                                        <Button onClick={() => handleRemoveRow(tableData.length - 1)} className="my-1 mx-1" style={{ border: "none", borderRadius: "20px", backgroundColor: "#ff6b6b", minWidth: "20px" }}>
                                            <DashCircleFill color="black" size={20} />
                                        </Button>
                                    </div>
                                </Form>

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Cantidad</th>
                                            <th>Descripción Corta</th>
                                            <th>Presupuesto</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, index) => (
                                            <tr key={index}>
                                                <td><Form.Control type="text" name="cantidad" value={row.cantidad} onChange={(e) => handleInputChange(index, e)} /></td>
                                                <td><Form.Control type="text" name="descripcionCorta" value={row.descripcionCorta} onChange={(e) => handleInputChange(index, e)} /></td>
                                                <td><Form.Control type="number" name="presupuesto" value={row.presupuesto} onChange={(e) => handleInputChange(index, e)} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <div>Presupuesto Total: {presupuestoTotal}</div>
                            </>
                        ) : null
                    }

                    <div className="col-12 my-2 px-3 d-flex justify-content-center">
                        <button onClick={handleCloseModal} className="my-1 mx-1" style={{ border: "none", borderRadius: "20px", backgroundColor: "#F45252", minWidth: "70px" }} >
                            <div className="d-flex justify-content-center py-3 px-3">
                                <XCircleFill color="black" size={50} />
                            </div>
                        </button>
                        <button type='submit' className="my-1 mx-1" style={{ border: "none", borderRadius: "20px", backgroundColor: "#74c87a", minWidth: "70px" }} >
                            <div className="d-flex justify-content-center py-3 px-3">
                                <CheckCircleFill color="black" size={50} />
                            </div>
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
};

export default ModalComponent;