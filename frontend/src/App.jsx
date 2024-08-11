import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Game from './pages/game/Game';
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import Header from "./components/header/Header";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Scrollbars } from "react-custom-scrollbars";
import Profile from "./pages/profile/Profile";
import Maintenance from "./pages/maintenance/Maintenance";

function AppRoutes({ setUsername }) {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/game" element={<Game />} />
            <Route path="/signin" element={<SignIn onLogin={setUsername} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="*" element={<div>404 Not Found</div>} /> {/*todo: 404 page*/}
        </Routes>
    );
}

export default function App() {
    const [username, setUsername] = useState(Cookies.get('username'));
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/game' && location.pathname !== '/maintenance' ? (
                <Scrollbars style={{ height: '100vh' }}>
                    <Header username={username} onLogout={setUsername} />
                    <AppRoutes setUsername={setUsername} />
                </Scrollbars>
            ) : (
                <AppRoutes setUsername={setUsername} />
            )}
        </>
    );
}