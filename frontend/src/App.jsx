import './App.css';

import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/homepage/Homepage';
import Game from './pages/game/Game';
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import Header from "./components/header/Header";
import {useState} from "react";
import Cookies from "js-cookie";

export default function App() {

    const [username, setUsername] = useState(Cookies.get('username'));

    return (
        <>
            <Header username={username} onLogout={setUsername} />

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/game" element={<Game />} />
                <Route path="/signin" element={<SignIn onLogin={setUsername} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<div>404 Not Found</div>} /> {/*todo: 404 page*/}
            </Routes>
        </>
    );
}
