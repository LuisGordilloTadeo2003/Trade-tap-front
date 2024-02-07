import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
    const LogoTradeTap = "/LogoTradeTap.jpg";

    return (
        <div className="col-7 d-flex align-items-center justify-content-center vh-100">
            <Link to="/">
                <img src={LogoTradeTap}
                    alt="Logo"
                    className="img-fluid"
                    style={{ maxWidth: '400px', maxHeight: '400px' }}>
                </img>
            </Link>
        </div>
    );
}

export default Logo;