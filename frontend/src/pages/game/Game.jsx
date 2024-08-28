import {useEffect, useState} from 'react';

import './styles.css';

import PlayerList from "../../components/game/players/PlayerList";
import Board from "../../components/game/board/Board";
import Actions from "../../components/game/actions/Actions";
import Cookies from "js-cookie";
import {Client} from "@stomp/stompjs";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {getRoomByName} from "../../utils/http";

export default function Game({setNotifications, setSelectedUser, setIsPrivateChatOpen}) {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {roomName} = useParams();

    const [room, setRoom] = useState({});
    const [players, setPlayers] = useState([]);
    const [dice, setDice] = useState({ firstRoll : null, secondRoll : null });

    const onGameMessageReceived = (message) => {
        const {type, content, room, member, firstRoll, secondRoll} = JSON.parse(message.body);
        console.log(content);
        switch (type) {
            case 'START':
                setRoom((prevRoom) => {
                    return {
                        ...prevRoom,
                        isStarted: true,
                        currentTurn: room.currentTurn
                    };
                });
                setPlayers((prevPlayers) => {
                    return prevPlayers.map(player => {
                        return player.civilization = "Random" ?
                            room.members.find(member => member.id === player.id) : player;
                    });
                });
                return;
            case 'ROLL_DICE':
                setPlayers((prevPlayers) => {
                    return prevPlayers.map(player => {
                        return player.id === member.id ? member : player;
                    });
                });
                setDice({firstRoll: firstRoll, secondRoll: secondRoll});
                return;
            case 'END_TURN':
                setRoom((prevRoom) => {
                    return {
                        ...prevRoom,
                        currentTurn: room.currentTurn
                    };
                });
                setPlayers((prevPlayers) => {
                    return prevPlayers.map(player => {
                        return player.user.username === room.currentTurn ? {...player, hasRolledDice: false} : player;
                    });
                });
                return;
            default:
                return;
        }

    }

    const handleStartGame = () => {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        try {
            client.publish({
                destination: `/app/rooms/${room.name}/startGame`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username
                }
            });
            console.log('Starting game...');
        } catch (error) {
            setNotifications(prev => [...prev, {
                message: 'Error starting game (no connection)',
                duration: 3500,
                isError: true
            }]);
        }
    }

    useEffect(() => {
        const token = Cookies.get('token');
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: () => {
                console.log('Game connected');
                client.subscribe('/topic/public/' + roomName + '/game', onGameMessageReceived);
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
    }, [navigate, roomName]);

    useEffect(() => {
        document.documentElement.classList.add('game-html');
        return () => {
            document.documentElement.classList.remove('game-html');
        };
    }, []);

    useEffect(() => {
        getRoomByName(roomName)
            .then((roomData) => {
                setRoom({
                    id: roomData.id,
                    name: roomData.name,
                    size: roomData.size,
                    isStarted: roomData.isStarted,
                    currentTurn: roomData.currentTurn,
                });
                setPlayers(roomData.members);
            })
            .catch((error) => setError({message: error.message || "An error occurred"}));
    }, [roomName]);

    return (
        <div className="grid-3">
            {!error && <>
                <PlayerList client={client} isConnected={isConnected}
                            room={room} onStartGame={handleStartGame}
                            players={players} setPlayers={setPlayers}
                            setNotifications={setNotifications}/>
                <Board room={room} players={players} dice={dice}
                       client={client} isConnected={isConnected}
                       setSelectedUser={setSelectedUser} setIsPrivateChatOpen={setIsPrivateChatOpen}
                       setNotifications={setNotifications}/>
                <Actions client={client}
                         room={room} players={players}
                         setNotifications={setNotifications}/>
            </>}
        </div>
    );
}