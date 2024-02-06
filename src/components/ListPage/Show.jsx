import React from "react";
import { useState, useEffect } from "react";

const Show = ({ cambiarRuta }) => {
    const [isDragging, setDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [buttonWidth, setButtonWidth] = useState(70);
    const maxButtonWidth = 250;

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const movementX = e.clientX - initialX;
                const newWidth = buttonWidth - movementX;

                if (newWidth >= 70) {
                    if (newWidth <= maxButtonWidth) {
                        setButtonWidth(newWidth);
                        setInitialX(e.clientX);
                    }

                    console.log(newWidth)

                    // Si alcanza el ancho máximo, cambia la ruta automáticamente
                    if (newWidth >= maxButtonWidth) {
                        setTimeout(() => cambiarRuta(), 100)
                    }
                }
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                setDragging(false);
                setButtonWidth(70); // Restablece el ancho del botón a su valor inicial
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, initialX, buttonWidth, cambiarRuta, maxButtonWidth]);

    const handleMouseDown = (e) => {
        setDragging(true);
        setInitialX(e.clientX);
    };

    return (
        <div className="col-4 px-1 d-flex justify-content-end">
            <button
                className={`my-1 mx-1 ${isDragging ? 'active' : ''}`}
                style={{
                    border: "none",
                    borderRadius: "20px",
                    backgroundColor: "#74c87a",
                    minWidth: "70px",
                    width: `${buttonWidth}px`,
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                <strong>←</strong>
            </button>

        </div>
    );
}

export default Show;