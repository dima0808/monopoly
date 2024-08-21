import {useEffect, useState} from 'react';

import './styles.css';

import PlayerList from "../../components/game/players/PlayerList";
import Board from "../../components/game/board/Board";
import Actions from "../../components/game/actions/Actions";
import Cookies from "js-cookie";
import {Client} from "@stomp/stompjs";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function Game({setNotifications}) {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const {roomName} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: () => {
                console.log('Game connected');
                setIsConnected(true);
            },
            onStompError: () => {
                console.log('Failed to connect game client');
                setIsConnected(false);
            },
        });

        client.activate();
        setClient(client);

        return () => {
            client.deactivate();
            setClient(null);
            setIsConnected(false);
        };
    }, [navigate]);

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
            <Board roomName={roomName} client={client} isConnected={isConnected} setNotifications={setNotifications} />
            <Actions/>
        </div>
    );
}