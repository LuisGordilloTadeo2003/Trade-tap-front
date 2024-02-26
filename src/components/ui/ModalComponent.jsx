import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill, PlusCircleFill, DashCircleFill } from 'react-bootstrap-icons';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import axios from '../../lib/axios';
import Cookies from 'js-cookie';
import MensajeFlash from './MensajeFlash';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const ModalComponent = ({ info, campo, showModal, handleCloseModal, nav, user }) => {
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    let userDataId = useParams().userId;
    let navigate = useNavigate();
    let [descripcions, setDescripcions] = useState();
    let [titulo, setTitulo] = useState();
    const [tableData, setTableData] = useState([{ cantidad: "", descripcionCorta: "", presupuesto: 0 }]);
    const [presupuestoTotal, setPresupuestoTotal] = useState(0);
    const [trabajo, setTrabajo] = useState("encargo");
    const [fechaEncargoInicio, setFechaEncargoInicio] = useState(null);
    const [fechaEncargoFin, setFechaEncargoFin] = useState(null);
    const [fechasReserva, setFechasReserva] = useState([{ inicio: null, fin: null }]);

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

    let presupuesto = obtenerPresupuesto();
    let tipo = trabajo;

    if (campo == "solicitud") {
        payload = {
            descripcion: descripcions,
            titulo,
            trabajador_id,
            cliente_id,
            estado
        };
    } else if (campo == "propuesta") {
        if (trabajo == "encargo") {
            payload = {
                titulo,
                descripcion: obtenerDescripcionesCortas(),
                presupuesto,
                tipo,
                estado,
                fecha_estimada_inicio: fechaEncargoInicio,
                fecha_estimada_final: fechaEncargoFin,
                cliente_id,
                trabajador_id
            };
        } else if (trabajo == "reserva") {
            payload = {
                titulo,
                descripcion: descripcions,
                presupuesto,
                tipo,
                cliente_id,
                trabajador_id
            };
        }
    }

    let rutaRol;

    nav.rol == "trabajador" ? rutaRol = "worker" : rutaRol = "cliente";

    const enviarData = async () => {
        console.log(payload);

        axios.defaults.headers['X-XSRF-TOKEN'] = xsrfToken;

        try {
            const response = await axios.post(`api/${campo}`, payload)
            MensajeFlash("Datos enviados correctamente", "success");
            if (campo == "propuesta") {
                await axios.delete(`api/solicitud/${info.id}`);
                navigate(`/proposal/${rutaRol}/${response.data.data.id}/${userDataId}`);
            }
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
        // Formatear el total con dos dígitos decimales y punto como separador decimal
        const formattedTotal = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        setPresupuestoTotal(formattedTotal);
    };

    const handleFechaReservaChange = (index, tipo, value) => {
        const nuevasFechasReserva = [...fechasReserva];
        nuevasFechasReserva[index][tipo] = value;
        setFechasReserva(nuevasFechasReserva);
    };

    const handleRemoveFechaReserva = (index) => {
        const nuevasFechasReserva = fechasReserva.filter((_, i) => i !== index);
        setFechasReserva(nuevasFechasReserva);
    };

    const handleAddFechaReserva = () => {
        setFechasReserva([...fechasReserva, { inicio: null, fin: null }]);
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
                                    <>
                                        <Form.Group controlId="fechaEncargoInicio" className="mb-2">
                                            <Form.Label>Fecha de Inicio:</Form.Label>
                                            <Form.Control type="date" value={fechaEncargoInicio} onChange={(e) => setFechaEncargoInicio(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId="fechaEncargoFin" className="mb-2">
                                            <Form.Label>Fecha de Fin:</Form.Label>
                                            <Form.Control type="date" value={fechaEncargoFin} onChange={(e) => setFechaEncargoFin(e.target.value)} />
                                        </Form.Group>
                                    </>
                                )}
                                {trabajo === 'reserva' && (
                                    <>
                                        {fechasReserva.map((fecha, index) => (
                                            <div key={index}>
                                                <Form.Group controlId={`fechaReservaInicio-${index}`} className="mb-2">
                                                    <Form.Label>Fecha de Inicio:</Form.Label>
                                                    <Form.Control type="date" value={fecha.inicio} onChange={(e) => handleFechaReservaChange(index, 'inicio', e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId={`fechaReservaFin-${index}`} className="mb-2">
                                                    <Form.Label>Fecha de Fin:</Form.Label>
                                                    <Form.Control type="date" value={fecha.fin} onChange={(e) => handleFechaReservaChange(index, 'fin', e.target.value)} />
                                                </Form.Group>
                                                {index > 0 && <Button onClick={() => handleRemoveFechaReserva(index)}>Eliminar</Button>}
                                            </div>
                                        ))}
                                        <Button onClick={handleAddFechaReserva}>Agregar Fecha</Button>
                                    </>
                                )}
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Cantidad</th>
                                            <th>Descripción Corta</th>
                                            <th>Presupuesto</th>
                                            <th><Button onClick={handleAddRow}><PlusCircleFill size={20} /></Button></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, index) => (
                                            <tr key={index}>
                                                <td><Form.Control type="text" name="cantidad" value={row.cantidad} onChange={(e) => handleInputChange(index, e)} /></td>
                                                <td><Form.Control type="text" name="descripcionCorta" value={row.descripcionCorta} onChange={(e) => handleInputChange(index, e)} /></td>
                                                <td><Form.Control type="number" name="presupuesto" value={row.presupuesto} onChange={(e) => handleInputChange(index, e)} /></td>
                                                <td>
                                                    {index > 0 && <Button onClick={() => handleRemoveRow(index)}><DashCircleFill size={20} /></Button>}
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