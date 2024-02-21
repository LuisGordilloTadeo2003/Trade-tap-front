import React from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import toast from 'react-hot-toast';

import Navbar from '../components/ui/Navbar';
import GuestNavbar from '../components/ui/GuestNavbar';
import Footer from "../components/ui/Footer";

import HomePage from "./HomePage";
import PageList from "./PageList";
import ProfilePage from "./ProfilePage"

const MainContent = () => {
    const { user, sessionVerified, sendEmailVerificationLink, status, loading } = useAuthContext();

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    return (
        <>
            <div className="row mb-4">
                {
                    user ? <Navbar /> : <GuestNavbar />
                }
            </div>
            <div className="row">
                <Routes>
                    <Route element={<HomePage />} path="/"></Route>
                    <Route element={<PageList />} path="/request"></Route>
                    <Route element={<PageList />} path="/reserves"></Route>
                    <Route element={<PageList />} path="/proposal"></Route>
                    <Route element={<PageList />} path="/workers"></Route>
                    <Route element={<ProfilePage />} path="/profile/worker/:id"></Route>
                    <Route element={<ProfilePage />} path="/:tipo/client/:id"></Route>
                </Routes>
            </div>
            <div className="row mt-4">
                <Footer />
            </div>
        </>
    );
}

export default MainContent;