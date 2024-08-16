import './App.css';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Game from './pages/game/Game';
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import Header from "./components/header/Header";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Scrollbars} from "react-custom-scrollbars";
import Profile from "./pages/profile/Profile";
import Maintenance from "./pages/maintenance/Maintenance";
import Admin from "./pages/admin/Admin";
import Rules from "./pages/rules/Rules";
import NotFound from "./pages/notFound/NotFound";
import {Client} from "@stomp/stompjs";
import {onErrorReceived, onNotificationReceived, removeNotification} from "./utils/notifications";
import NotificationList from "./components/notification/NotificationList";

function AppRoutes({setNickname, notifications, setNotifications, isPrivateChatOpen, setIsPrivateChatOpen}) {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage setNotifications={setNotifications}/>}/>
                <Route path="/game/:roomName" element={<Game setNotifications={setNotifications}/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/rules" element={<Rules/>}/>
                <Route path="/signin" element={<SignIn onLogin={setNickname}/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/profile/:nickname"
                       element={<Profile onUpdate={setNickname}
                                         notifications={notifications}
                                         setNotifications={setNotifications}
                                         isPrivateChatOpen={isPrivateChatOpen}
                                         setIsPrivateChatOpen={setIsPrivateChatOpen}/>}/>
                <Route path="/maintenance" element={<Maintenance/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default function App() {
    const [nickname, setNickname] = useState(Cookies.get('nickname'));
    const location = useLocation();
    const [notifications, setNotifications] = useState([]);
    const [isPrivateChatOpen, setIsPrivateChatOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: () => {
                console.log('App connected');
                client.subscribe('/user/' + username + '/queue/notifications',
                    (message) => onNotificationReceived(navigate, message, setNotifications));
                client.subscribe('/user/' + username + '/queue/errors',
                    (message) => onErrorReceived(message, setNotifications));
            },
            onStompError: () => {
                console.log('Failed to connect notification client');
            },
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [navigate]);

    return (
        <>
            {!(location.pathname.startsWith('/game/') || location.pathname === '/maintenance') ? (
                <Scrollbars style={{height: '100vh'}}>
                    <Header nickname={nickname} onLogout={setNickname}/>
                    <AppRoutes setNickname={setNickname}
                               notifications={notifications}
                               setNotifications={setNotifications}
                               isPrivateChatOpen={isPrivateChatOpen}
                               setIsPrivateChatOpen={setIsPrivateChatOpen}/>
                </Scrollbars>
            ) : (
                <AppRoutes setNickname={setNickname}
                           notifications={notifications}
                           setNotifications={setNotifications}
                           isPrivateChatOpen={isPrivateChatOpen}
                           setIsPrivateChatOpen={setIsPrivateChatOpen}/>
            )}
            <NotificationList
                notifications={notifications}
                onRemove={(timestamp) => removeNotification(timestamp, setNotifications)}
                isPrivateChatOpen={isPrivateChatOpen}
            />
        </>
    );
}