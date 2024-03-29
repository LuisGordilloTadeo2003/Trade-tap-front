import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import MainContent from './pages/MainContent';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/style.css"
import RegisterLoginPage from './pages/RegisterLoginPage';

export default function App() {
  return (
    <div className="App custom-bg-color ">
      <div className="justify-content-center align-items-center text-white">
        <Routes>
          <Route element={<RegisterLoginPage />} path="/login"></Route>
          <Route element={<RegisterLoginPage />} path="/register"></Route>
          <Route element={<RegisterLoginPage />} path="/registerWorker"></Route>
          <Route element={<RegisterLoginPage />} path="/forgot-password" />
          <Route element={<RegisterLoginPage />} path="/password-reset/:token" />
          <Route element={<MainContent />} path="/*" />
        </Routes>

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
