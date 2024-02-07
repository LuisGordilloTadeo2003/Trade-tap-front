import React from "react";
import Register from "../components/RegisterLogin/Register";
import Login from "../components/RegisterLogin/Login"
import Logo from "../components/RegisterLogin/Logo"
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

const RegisterLoginPage = () => {
    const path = window.location.pathname;

    console.log(path)

    return (
        <div className="container-fluid custom-bg-color">
            <div className="row align-items-center">
                <Logo />
                {
                    path === "/login"
                        ? <Login />
                        : path === "/register" || path === "/registerWorker"
                            ? <Register />
                            : path === "/forgot-password"
                                ? <ForgotPassword />
                                : path === "/reset-password/:token"
                                    ? <ResetPassword />
                                    :
                                    null
                }
            </div>
        </div>
    );
}

export default RegisterLoginPage;