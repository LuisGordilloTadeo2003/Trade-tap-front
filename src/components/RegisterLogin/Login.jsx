// Importa React y estilos de Bootstrap
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const { login, errors, loading } = useAuthContext();
    const handleLogin = async (e) => {
        e.preventDefault();
        login({ usuario, password });
    };

    return (
        <div className="col-md-5 p-5 d-flex align-items-center justify-content-center border-custom-registerLogin">
            <form className='pl-3 row g-3 justify-content-center' method='POST' onSubmit={handleLogin}>
                <h2 className="text-center mb-4 text-white">Sign in</h2>
                <div className="col-md-7">
                    <label className='form-label text-white'>Usuario *</label>
                    <input type="text" className="form-control custom-input" id="username" name='usuario' placeholder="Ingresa tu usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </div>
                <div className="col-md-7">
                    <label className='form-label text-white'>Contraseña *</label>
                    <input type="password" className="form-control custom-input" id="password" name='password' placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='col-md-7 m-0'>
                    <Link to={'/register'} className="text-register" href="/register">No tengo una cuenta</Link>
                </div>
                <div className='col-md-7'>
                    <button type="submit" className="btn color-button-general">
                        <Spinner loading={loading} />
                        <strong>Sign in</strong>
                    </button>
                </div>
            </form>
        </div>
    );
};
