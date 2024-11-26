import {useEffect, useState} from 'react';

import './styles.css';

import PlayerList from "../../components/game/players/PlayerList";
import Board from "../../components/game/board/Board";
import Actions from "../../components/game/actions/Actions";
import Cookies from "js-cookie";
import {Client} from "@stomp/stompjs";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {getAllAdditionalEffects, getProperties, getRoomByName} from "../../utils/http";
import {IP} from "../../constraints";

import diceRollSound from "../../sounds/dice-rolling.mp3";
const diceRollAudio = new Audio(diceRollSound);
diceRollAudio.volume = 0.05;

export default function Game({setNotifications, setSelectedUser, setIsPrivateChatOpen}) {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {roomName} = useParams();

    const [room, setRoom] = useState({});
    const [players, setPlayers] = useState([]);
    const [properties, setProperties] = useState({});
    const [additionalEffects, setAdditionalEffects] = useState([]);
    const [dice, setDice] = useState({ firstRoll : null, secondRoll : null });

    const [activeTab, setActiveTab] = useState("Events");
    const [managementActiveTab, setManagementActiveTab] = useState("Empire");
    const [selectedProperty, setSelectedProperty] = useState(null);


    const onGameMessageReceived = (message) => {
        const {type, content, room, member, property, firstRoll, secondRoll} = JSON.parse(message.body);
        console.log(content);
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        switch (type) {
            case 'START':
                setRoom((prevRoom) => {
                    return {
                        ...prevRoom,
                        isStarted: true,
                        currentTurn: room.currentTurn,
                        turn: room.turn,
                        randomMemberIndex: room.randomMemberIndex
                    };
                });
                setPlayers(room.members);
                return;
            case 'ROLL_DICE':
                setPlayers((prevPlayers) => {
                    return prevPlayers.map(player => {
                        return player.id === member.id ? member : player;
                    });
                });
                setDice({ firstRoll: firstRoll, secondRoll: secondRoll });
                diceRollAudio.play().catch(() => {});
                return;
            case 'BERMUDA':
            case 'TOURIST':
                setPlayers((prevPlayers) => {
                    return prevPlayers.map(player => {
                        return player.id === member.id ? member : player;
                    });
                });
                return;
            case 'BUY_PROPERTY':
            case 'UPGRADE_PROPERTY':
            case 'DOWNGRADE_PROPERTY':
                // setProperties((prevProperties) => {
                //     return {
                //         ...prevProperties,
                //         [property.position]: {
                //             ...prevProperties[property.position],
                //             member: property.member,
                //             upgrades: property.upgrades,
                //             mortgage: property.mortgage,
                //             goldOnStep: property.goldOnStep,
                //             goldPerTurn: property.goldPerTurn,
                //             upgradeRequirements: property.upgradeRequirements
                //         }
                //     };
                // });
                setPlayers((prevPlayers) => {
                    return prevPlayers.map(player => {
                        return player.id === property.member.id ? property.member : player;
                    });
                });
                getProperties(roomName, token)
                    .then((propertiesArray) => {
                        const propertiesObject = propertiesArray.reduce((acc, property) => {
                            acc[property.position] = property;
                            return acc;
                        }, {});
                        setProperties(propertiesObject);
                    })
                    .catch((error) => setError({message: error.message || "An error occurred"}));
                return;
            case 'PAY_RENT':
            case 'GREAT_LIBRARY_PAYMENT':
            case 'BIG_BEN_PAYMENT':
                setPlayers(room.members);
                return;
            case 'PROJECTS':
                getProperties(roomName, token)
                    .then((propertiesArray) => {
                        const propertiesObject = propertiesArray.reduce((acc, property) => {
                            acc[property.position] = property;
                            return acc;
                        }, {});
                        setProperties(propertiesObject);
                    })
                    .catch((error) => setError({message: error.message || "An error occurred"}));
                getAllAdditionalEffects(username)
                    .then(setAdditionalEffects)
                    .catch((error) => setError({message: error.message || "An error occurred"}));
                return;
            case 'END_TURN':
            case 'FORCE_END_TURN':
                setRoom((prevRoom) => {
                    return {
                        ...prevRoom,
                        currentTurn: room.currentTurn,
                        winner: room.winner,
                        victoryType: room.victoryType,
                        turn: room.turn
                    };
                });
                setPlayers(room.members);
                getProperties(roomName, token)
                    .then((propertiesArray) => {
                        const propertiesObject = propertiesArray.reduce((acc, property) => {
                            acc[property.position] = property;
                            return acc;
                        }, {});
                        setProperties(propertiesObject);
                    })
                    .catch((error) => setError({message: error.message || "An error occurred"}));
                getAllAdditionalEffects(username)
                    .then(setAdditionalEffects)
                    .catch((error) => setError({message: error.message || "An error occurred"}));
                return;
            case 'BYPASS_START':
                if (member.user.username !== Cookies.get('username')) {
                    return;
                }
                getProperties(roomName, token)
                    .then((propertiesArray) => {
                        const propertiesObject = propertiesArray.reduce((acc, property) => {
                            acc[property.position] = property;
                            return acc;
                        }, {});
                        setProperties(propertiesObject);
                    })
                    .catch((error) => setError({message: error.message || "An error occurred"}));
                return;
            case 'CHEAT_ADD_GOLD':
            case 'CHEAT_ADD_STRENGTH':
            case 'CHEAT_ADD_EVENT':
                setPlayers(room.members);
                return;
            default:
                return;
        }
    };

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
            brokerURL: 'ws://' + IP + ':8080/ws',
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
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        getRoomByName(roomName)
            .then((roomData) => {
                setRoom({
                    id: roomData.id,
                    name: roomData.name,
                    size: roomData.size,
                    isStarted: roomData.isStarted,
                    currentTurn: roomData.currentTurn,
                    winner: roomData.winner,
                    victoryType: roomData.victoryType,
                    turn: roomData.turn,
                    randomMemberIndex: roomData.randomMemberIndex
                });
                setPlayers(roomData.members);
            })
            .catch((error) => setError({message: error.message || "An error occurred"}));
        getProperties(roomName, token)
            .then((propertiesArray) => {
                const propertiesObject = propertiesArray.reduce((acc, property) => {
                    acc[property.position] = property;
                    return acc;
                }, {});
                setProperties(propertiesObject);
            })
            .catch((error) => setError({message: error.message || "An error occurred"}));
        getAllAdditionalEffects(username)
            .then(setAdditionalEffects)
            .catch((error) => setError({message: error.message || "An error occurred"}));
    }, [roomName]);

    return (
        <div className="grid-3">
            {!error && <>
                <PlayerList client={client} isConnected={isConnected}
                            room={room} onStartGame={handleStartGame}
                            players={players} setPlayers={setPlayers}
                            setNotifications={setNotifications}/>
                <Board room={room} players={players} dice={dice} properties={properties}
                       client={client} isConnected={isConnected}
                       setSelectedUser={setSelectedUser} setIsPrivateChatOpen={setIsPrivateChatOpen}
                       setActiveTab={setActiveTab} setManagementActiveTab={setManagementActiveTab}
                       setSelectedProperty={setSelectedProperty}
                       setNotifications={setNotifications}/>
                <Actions client={client} isConnected={isConnected}
                         room={room} players={players} setPlayers={setPlayers}
                         properties={properties} additionalEffects={additionalEffects}
                         activeTab={activeTab} setActiveTab={setActiveTab}
                         selectedProperty={properties[selectedProperty]} setSelectedProperty={setSelectedProperty}
                         managementActiveTab={managementActiveTab} setManagementActiveTab={setManagementActiveTab}
                         setNotifications={setNotifications}/>
            </>}
        </div>
    );
}