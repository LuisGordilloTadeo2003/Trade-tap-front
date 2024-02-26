import React from "react";
import { Github } from "react-bootstrap-icons";

const Footer = () => {
    return (
        <footer className="custom-bg-color border-top fixed-bottom border-color text-center py-3">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        <p>2024 TradeTap. Bajo la licencia GPLv3.</p>
                    </div>
                    <div className="col-6 d-flex">
                        <a href="https://github.com/LuisGordilloTadeo2003" className="me-3 d-flex align-items-center">
                            <Github size={20} className="me-1" />
                            Luis Gordillo Tadeo
                        </a>
                        <a href="https://github.com/Ismael-MM" className="d-flex align-items-center">
                            <Github size={20} className="me-1" />
                            Ismael Montelongo Montelongo
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;