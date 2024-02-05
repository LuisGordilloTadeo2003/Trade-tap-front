import React from "react";
import Register from "../RegisterLoginPage/Register"
import LoginForm from "../RegisterLoginPage/Login"
import Logo from "../RegisterLoginPage/Logo"

const RegisterLoginPage = () => {
    const path = window.location.pathname;

    console.log(path)

    return (
        <div className="container-fluid custom-bg-color">
            <div className="row align-items-center">
                <Logo />
                {
                    path === "/login"
                        ? <LoginForm />
                        : path === "/register"
                            ? <Register />
                            : null
                }
            </div>
        </div>
    );
}

export default RegisterLoginPage;