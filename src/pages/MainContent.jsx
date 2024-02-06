import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import PageList from "./PageList";
import ProfilePage from "./ProfilePage"

const MainContent = () => {
    return (
        <Routes>
            <Route element={<HomePage />} path="/"></Route>
            <Route element={<PageList />} path="/request"></Route>
            <Route element={<PageList />} path="/reserves"></Route>
            <Route element={<PageList />} path="/proposal"></Route>
            <Route element={<PageList />} path="/workers"></Route>
            <Route element={<ProfilePage />} path="/profile/worker"></Route>
            <Route element={<ProfilePage />} path="/profile/client"></Route>
        </Routes>
    );
}

export default MainContent;