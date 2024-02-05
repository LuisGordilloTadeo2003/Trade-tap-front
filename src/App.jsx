import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import GuestLayout from './components/layout/GuestLayout';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/RegisterLoginPage/RegisterLoginPage';
import Register from './pages/RegisterLoginPage/RegisterLoginPage';
import ResetPassword from './pages/ResetPassword';
import QuickStart from './pages/QuickStart';
import ErrorBoundary from './components/ErrorBoundary';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/style.css"

export default function App() {
    return (<>
      <Routes>
        <Route element={<ErrorBoundary>
              <AuthLayout />
            </ErrorBoundary>}>
          <Route path="/" element={<Home />}/>
          <Route path="/quickstart" element={<QuickStart />}/>
        </Route>
        <Route element={<ErrorBoundary>
              <GuestLayout />
            </ErrorBoundary>}>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/password-reset/:token" element={<ResetPassword />}/>
        </Route>
      </Routes>
      <Toaster position="top-right" toastOptions={{ duration: 6000 }}/>
    </>);
}
