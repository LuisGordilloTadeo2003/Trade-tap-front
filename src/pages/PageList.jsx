import React from "react";
import List from "../components/ListPage/List"
let dataWorkers = [
    {
        id: 1,
        name: "Luis",
        apellido1: "Gordillo",
        apellido2: "Tadeo",
        descripcion: "soy el primero",
        valoracion: 5,
        foto: "/Profile.png",
        profesiones: ["dj", "carpintero", "electricista"]
    },
    {
        id: 2,
        name: "Luis",
        apellido1: "Gordillo",
        apellido2: "Tadeo",
        descripcion: "soy el segundo",
        valoracion: 3,
        foto: "/Profile.png",
        profesiones: ["dj", "carpintero", "electricista"]
    },
    {
        id: 3,
        name: "Luis",
        apellido1: "Gordillo",
        apellido2: "Tadeo",
        descripcion: "soy el tercero",
        valoracion: 4.5,
        foto: "/Profile.png",
        profesiones: ["dj", "carpintero", "electricista"]
    }
];

let dataRequest = [
    {
        id: 1,
        titulo: "Programar Web",
        descripcion: "DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion",
        estado: ["Aceptada", "Pendiente", "Cancelada"],
        cliente: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        trabajador: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        foto: "/Profile.png"
    },
    {
        id: 2,
        titulo: "Programar Web",
        descripcion: "DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion",
        estado: ["Aceptada", "Pendiente", "Cancelada"],
        cliente: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        trabajador: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        foto: "/Profile.png"
    },
    {
        id: 3,
        titulo: "Programar Web",
        descripcion: "DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion",
        estado: ["Aceptada", "Pendiente", "Cancelada"],
        cliente: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        trabajador: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        foto: "/Profile.png"
    }
]

let dataProposal = [
    {
        id: 1,
        titulo: "Programar Web",
        descripcion: "DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion",
        presupuesto: 2000,
        estado: ["Aceptada", "Pendiente", "Cancelada"],
        cliente: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        trabajador: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        foto: "/Profile.png"
    },
    {
        id: 2,
        titulo: "Programar Web",
        descripcion: "DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion",
        presupuesto: 2000,
        estado: ["Aceptada", "Pendiente", "Cancelada"],
        cliente: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        trabajador: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        foto: "/Profile.png"
    },
    {
        id: 3,
        titulo: "Programar Web",
        descripcion: "DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion",
        presupuesto: 2000,
        estado: ["Aceptada", "Pendiente", "Cancelada"],
        cliente: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        trabajador: {
            id: 1,
            name: "Juan",
            apellido1: "Ramirez",
            apellido2: "Zapata",
        },
        foto: "/Profile.png"
    }
]

const PageList = () => {
    let data;
    let tipo;

    switch (window.location.pathname) {
        case '/request':
            data = dataRequest;
            tipo = "request";
            break;

        case '/workers':
            data = dataWorkers;
            tipo = "workers";
            break;

        case '/proposal':
            data = dataProposal;
            tipo = "proposal";
            break;

        default:
            data = [];
            break;
    }
    return (
        <div>
            <List data={data} tipo={tipo} />
        </div>
    );
}

export default PageList;