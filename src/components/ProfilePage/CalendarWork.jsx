import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CalendarWork = () => {
    const calendarRef = useRef(null);
    const [events, setEvents] = useState([
        { title: "Mesa", start: "2024-02-26", end: "2024-02-29", color: "red" },
        { title: "Jardin", start: "2024-02-26", end: "2024-02-26", color: "blue" },
        { title: "Pintar casa", start: "2024-02-29", color: "green" },
        { title: "3 sillas", start: "2024-03-02", end: "2024-03-04", color: "pink" },
    ]);

    const handleDateClick = (info) => {
        const title = prompt("Ingrese el título del evento:");
        if (title) {
            setEvents([...events, { title, start: info.dateStr, end: info.dateStr }]);
        }
    };

    return (
        <div className="row mt-3">
            <div className="col">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridDay" // Cambiar a la vista de día
                    events={events}
                    dateClick={handleDateClick}
                    eventDurationEditable={false} // Evitar que los eventos se puedan modificar en duración
                    headerToolbar={{
                        start: "",
                        center: "title",
                        end: "today prev,next",
                    }}
                />
            </div>
        </div>
    );
};

export default CalendarWork;