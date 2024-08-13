import {useEffect, useState} from 'react';

import './styles.css';

import PlayerList from "../../components/game/players/PlayerList";
import Board from "../../components/game/board/Board";
import Actions from "../../components/game/actions/Actions";
import Cookies from "js-cookie";
import {Client} from "@stomp/stompjs";
import NotificationList from "../../components/notification/NotificationList";
import {onErrorReceived, onNotificationReceived, removeNotification} from "../../utils/notifications";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function Game() {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const {roomName} = useParams();
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
                console.log('Game connected');
                client.subscribe('/user/' + username + '/queue/notifications',
                    (message) => onNotificationReceived(navigate, message, setNotifications));
                client.subscribe('/user/' + username + '/queue/errors',
                    (message) => onErrorReceived(message, setNotifications));
                setIsConnected(true);
            },
            onStompError: () => {
                console.log('Failed to connect');
                setIsConnected(false);
            },
        });

        client.activate();
        setClient(client);

        return () => {
            client.deactivate();
        };
    }, []);

    useEffect(() => {
        document.documentElement.classList.add('game-html');
        return () => {
            document.documentElement.classList.remove('game-html');
        };
    }, []);

    return (
        <div className="grid-3">
            <PlayerList client={client} isConnected={isConnected} roomName={roomName}
                        setNotifications={setNotifications}/>
            <Board/>
            <Actions/>
            <NotificationList
                notifications={notifications}
                onRemove={(timestamp) => removeNotification(timestamp, setNotifications)}
            />
        </div>
    );
}