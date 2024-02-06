import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import GuestLayout from './components/layout/GuestLayout';
import Home from './pages/Home';
import QuickStart from './pages/QuickStart';
import ErrorBoundary from './components/ErrorBoundary';

import NavBar from './components/ui/Navbar';
import GuestNavbar from './components/ui/GuestNavbar';

import MainContent from './pages/MainContent';
import Footer from './components/ui/Footer';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/style.css"
import RegisterLoginPage from './pages/RegisterLoginPage';

export default function App() {
  let path = window.location.pathname;

  return (
    <div className="App custom-bg-color ">
      <div className="justify-content-center align-items-center text-white">
        {
          (path === "/login" || path === "/register") ? (
            <Routes>
              <Route element={<RegisterLoginPage />} path="/login"></Route>
              <Route element={<RegisterLoginPage />} path="/register"></Route>
              <Route element={<RegisterLoginPage />} path="/forgot-password" />
              <Route element={<RegisterLoginPage />} path="/password-reset/:token" />
            </Routes>
          ) : (
            <>
              <div className="row mb-4">
                <NavBar />
              </div>
              <div className="row">
                <MainContent />
              </div>
              <div className="row mt-4">
                <Footer />
              </div>
            </>
          )
        }
        <Toaster position="top-right" toastOptions={{ duration: 6000 }} />
      </div>
    </div>
  );
}

/*
  return (
    <div className="App custom-bg-color ">
      <div className="justify-content-center align-items-center text-white">
        {
          (path === "/login" || path === "/register") ? (
            <Routes>
              <Route element={<RegisterLoginPage />} path="/login"></Route>
              <Route element={<RegisterLoginPage />} path="/register"></Route>
            </Routes>
          ) : (
            <>
              <div className="row mb-4">
                <NavBar />
              </div>
              <div className="row">
                <MainContent />
              </div>
              <div className="row mt-4">
                <Footer />
              </div>
            </>
          )
        }
      </div>
    </div>
  );
*/
