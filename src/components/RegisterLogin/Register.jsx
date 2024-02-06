import { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import RegisterWorker from './RegisterWorker';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [direccion, setDireccion] = useState('');
  const [provincia, setProvincia] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [usuario, setUsuario] = useState('');
  const [cp, setCp] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const { register, errors, loading } = useAuthContext();
  const handleRegister = async (e) => {
    e.preventDefault();
    register({ name, usuario, email, password, apellido1, apellido2, direccion, provincia, localidad, cp, telefono, password_confirmation });
  };

  const separarApellidos = (e) => {
    let [apellido1, apellido2] = e.split(' ');

    setApellido1(apellido1);
    setApellido2(apellido2);
  }

  const [cif, setCif] = useState('');
  const [profesiones, setProfesiones] = useState([]);

  const handleCifChange = (newValue) => {
    setCif(newValue);
  };

  const handleProfesionesChange = (newProfesiones) => {
    setProfesiones(newProfesiones);
  };

  return (
    <div className="col-md-5 p-5 d-flex align-items-center justify-content-center border-custom-registerLogin">
      <form className="pl-3 row g-3" onSubmit={handleRegister}>
        <h2 className="text-center mb-4 text-white">Sign up</h2>
        <div className="col-md-6">
          <label className="form-label text-white">Nombre *</label>
          <input
            type="text"
            className="form-control custom-input"
            name="name"
            placeholder='Nombre'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-white">Apellidos *</label>
          <input
            type="text"
            className="form-control custom-input"
            name="apellidos"
            placeholder='Apellidos'
            onChange={(e) => separarApellidos(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label className="form-label text-white">Email *</label>
          <input
            type="email"
            className="form-control custom-input"
            name="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label className="form-label text-white">Telefono *</label>
          <input
            type="tel"
            className="form-control custom-input"
            name="telefono"
            placeholder="Telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label className="form-label text-white">Provincia *</label>
          <input
            type="text"
            className="form-control custom-input"
            name="provincia"
            placeholder="Provincia"
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label className="form-label text-white">Codigo Postal *</label>
          <input
            type="text"
            className="form-control custom-input"
            name="cp"
            placeholder="Codigo Postal"
            value={cp}
            onChange={(e) => setCp(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label className="form-label text-white">Dirección *</label>
          <input
            type="text"
            className="form-control custom-input"
            name="direccion"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label className="form-label text-white">Localidad *</label>
          <input
            type="text"
            className="form-control custom-input"
            name="localidad"
            placeholder="Localidad"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
          />
        </div>
        <RegisterWorker cif={cif} setCif={handleCifChange} profesiones={profesiones} setProfesiones={handleProfesionesChange} />
        <div className="col-md-12">
          <label className="form-label text-white">Usuario *</label>
          <input
            type="text"
            className="form-control custom-input"
            name="usuario"
            placeholder='Usuario'
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-white">Contraseña *</label>
          <input
            type="password"
            className="form-control custom-input"
            name="password"
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-white">Confirmar contraseña *</label>
          <input
            type="password"
            className="form-control custom-input"
            name="password_confirmation"
            placeholder='Repite la contraseña'
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        {errors.password && (<span className="text-red-400 text-sm">{errors.password[0]}</span>)}
        <div className='col-md-7 m-0'>
          <Link to={'/login'} className="text-register" href="/login">Ya tengo una cuenta</Link>
        </div>
        <div className="col-12">
          <button type="submit" className="btn color-button-general" disabled={loading}>
            <Spinner loading={loading} />
            <strong>Sign up</strong>
          </button>
        </div>
      </form>
    </div>
  );
}
