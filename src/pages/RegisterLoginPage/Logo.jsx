import React from "react";

const Logo = () => {
    const LogoTradeTap = "/LogoTradeTap.jpg";

    return (
        <div className="col-7 d-flex align-items-center justify-content-center vh-100">
            <img src={LogoTradeTap}
                alt="Logo"
                className="img-fluid"
                style={{ maxWidth: '400px', maxHeight: '400px' }}>
            </img>
        </div>
    );
}

export default Logo;