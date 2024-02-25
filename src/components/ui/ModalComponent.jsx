import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill, PlusCircleFill, DashCircleFill } from 'react-bootstrap-icons';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import axios from '../../lib/axios';
import Cookies from 'js-cookie';

const ModalComponent = ({ campo, showModal, handleCloseModal, nav, user }) => {
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    let [descripcions, setDescripcions] = useState();
    let [titulo, setTitulo] = useState();
    const [tableData, setTableData] = useState([{ cantidad: "", descripcionCorta: "", presupuesto: 0 }]);
    const [presupuestoTotal, setPresupuestoTotal] = useState(0);
    const [trabajo, setTrabajo] = useState("encargo");
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [fechaEncargo, setFechaEncargo] = useState(null);
    const [fechaReservaInicio, setFechaReservaInicio] = useState(null);
    const [fechaReservaFin, setFechaReservaFin] = useState(null);

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

    const obtenerDescripcionesCortas = () => {
        // Obtener todas las descripciones cortas
        const descripcionesCortas = tableData.map(row => row.descripcionCorta);

        // Unir las descripciones cortas en un solo string separado por " - "
        const descripcionCompleta = descripcionesCortas.join(" - ");

        return descripcionCompleta;
    };

    const obtenerPresupuesto = () => {
        return presupuestoTotal;
    }

    const obtenerFecha = () => {
        if (trabajo === 'encargo') {
            return fechaEncargo;
        } else if (trabajo === 'reserva') {
            return {
                inicio: fechaReservaInicio,
                fin: fechaReservaFin
            };
        }
        return null;
    };

    let descripcion = obtenerDescripcionesCortas();
    let presupuesto = obtenerPresupuesto();
    let tipo = trabajo;
    let fecha_estimada = obtenerFecha().toString();
    let nombre = titulo;

    if (campo == "solicitud") {
        payload = {
            descripcion,
            titulo,
            trabajador_id,
            cliente_id,
            estado
        };
    } else if (campo == "propuesta") {
        payload = {
            nombre,
            descripcion,
            presupuesto,
            tipo,
            fecha_estimada,
            cliente_id,
            trabajador_id
        };

    }

    const enviarData = async () => {
        console.log(payload);

        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        try {
            await axios.post(`api/${campo}`, payload)
            console.log(payload);
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

        enviarData();
        handleCloseModal();
    };

    const handleAddRow = () => {
        setTableData([...tableData, { cantidad: "", descripcionCorta: "", presupuesto: 0 }]);
    };

    const handleRemoveRow = (index) => {
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
        const total = data.reduce((acc, curr) => acc + (parseFloat(curr.presupuesto) * parseInt(curr.cantidad)), 0);
        const formattedTotal = total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        setPresupuestoTotal(formattedTotal);
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                {send === "profile" ?
                    <Modal.Title>Enviar Solicitud</Modal.Title>
                    : send === "request" ?
                        <Modal.Title>Enviar Propuesta</Modal.Title>
                        : null}
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {send === "profile" ?
                        <>
                            <Form.Group controlId="title">
                                <Form.Control type="text" placeholder="Ingrese el título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="description" className='my-3'>
                                <Form.Control as="textarea" rows={3} placeholder="Ingrese la descripción" value={descripcions} onChange={(e) => setDescripcions(e.target.value)} />
                            </Form.Group>
                        </>
                        : send === "request" ?
                            <>
                                <Form.Group controlId="titulo">
                                    <Form.Control type="text" placeholder="Ingrese el título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="description" className='my-3'>
                                    <Form.Control as="textarea" rows={3} placeholder="Ingrese la descripción" value={descripcions} onChange={(e) => setDescripcions(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="trabajo">
                                    <Form.Label>Trabajo:</Form.Label>
                                    <Form.Check type="radio" name="trabajo" id="encargo" label="Encargo" checked={trabajo === 'encargo'} onChange={() => setTrabajo('encargo')} />
                                    <Form.Check type="radio" name="trabajo" id="reserva" label="Reserva" checked={trabajo === 'reserva'} onChange={() => setTrabajo('reserva')} />
                                </Form.Group>
                                {trabajo === 'encargo' && (
                                    <Form.Group controlId="fechaEncargo">
                                        <Form.Label>Fecha de Encargo:</Form.Label>
                                        <Form.Control type="date" value={fechaEncargo} onChange={(e) => setFechaEncargo(e.target.value)} />
                                    </Form.Group>
                                )}
                                {trabajo === 'reserva' && (
                                    <>
                                        <Form.Group controlId="fechaReservaInicio">
                                            <Form.Label>Fecha de Inicio:</Form.Label>
                                            <Form.Control type="date" value={fechaReservaInicio} onChange={(e) => setFechaReservaInicio(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId="fechaReservaFin">
                                            <Form.Label>Fecha de Fin:</Form.Label>
                                            <Form.Control type="date" value={fechaReservaFin} onChange={(e) => setFechaReservaFin(e.target.value)} />
                                        </Form.Group>
                                    </>
                                )}
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Cantidad</th>
                                            <th>Descripción Corta</th>
                                            <th>Presupuesto</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, index) => (
                                            <tr key={index}>
                                                <td><Form.Control type="text" name="cantidad" value={row.cantidad} onChange={(e) => handleInputChange(index, e)} /></td>
                                                <td><Form.Control type="text" name="descripcionCorta" value={row.descripcionCorta} onChange={(e) => handleInputChange(index, e)} /></td>
                                                <td><Form.Control type="number" name="presupuesto" value={row.presupuesto} onChange={(e) => handleInputChange(index, e)} /></td>
                                                <td>
                                                    {index === tableData.length - 1 && <Button onClick={handleAddRow}><PlusCircleFill size={20} /></Button>}
                                                    {tableData.length > 1 && <Button onClick={() => handleRemoveRow(index)}><DashCircleFill size={20} /></Button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div>Presupuesto Total: {presupuestoTotal}</div>
                            </>
                            : null
                    }
                    <div className="col-12 my-2 px-3 d-flex justify-content-center">
                        <Button onClick={handleCloseModal} className="my-1 mx-1" style={{ border: "none", borderRadius: "20px", backgroundColor: "#F45252", minWidth: "70px" }}>
                            <div className="d-flex justify-content-center py-3 px-3">
                                <XCircleFill color="black" size={50} />
                            </div>
                        </Button>
                        <Button type='submit' className="my-1 mx-1" style={{ border: "none", borderRadius: "20px", backgroundColor: "#74c87a", minWidth: "70px" }}>
                            <div className="d-flex justify-content-center py-3 px-3">
                                <CheckCircleFill color="black" size={50} />
                            </div>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalComponent;