import React, {useEffect, useState} from "react";
import {getAllPlayers} from "../../../utils/http";
import Player from "./Player";
import './styles.css';
import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";
import {handleDeleteRoom, handleKickMember, handleLeaveRoom, isUserLeaderCookies} from "../../../utils/lobby";

export default function PlayerList({client, isConnected, roomName, setNotifications}) {
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function onPlayerMessageReceived(message) {
        const {type, content, room, member} = JSON.parse(message.body);
        console.log(content);
        setPlayers((prevPlayers) => {
            switch (type) {
                case 'JOIN':
                    return room.members;
                case 'LEAVE':
                    return room.members;
                case 'KICK':
                    return room.members;
                case 'DELETE':
                    return [];
                case 'CHANGE_CIVILIZATION':
                    return prevPlayers.map(player =>
                        player.id === member.id ? member : player
                    );
                default:
                    return prevPlayers;
            }
        });
    }

    useEffect(() => {
        if (client && isConnected) {
            getAllPlayers(roomName).then(setPlayers)
                .catch((error) => setError({message: error.message || "An error occurred"}));
            const subscription = client.subscribe('/topic/public/' + roomName + '/players', onPlayerMessageReceived);
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [client, isConnected, roomName]);

    function handleChangeCivilization(civilization) {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        try {
            client.publish({
                destination: `/app/rooms/${roomName}/changeCivilization/${civilization}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username
                }
            });
            console.log('Changing civilization for ' + username + ' to ' + civilization + '...');
        } catch (error) {
            setNotifications(prev => [...prev, {
                message: 'Error changing civilization (no connection)',
                duration: 3500,
                isError: true
            }]);
        }
    }

    return (
        <section className="players">
            <h2>Players</h2>
            <Link to="/">Homepage</Link>
            <button onClick={() => {
                handleLeaveRoom(roomName, client, setNotifications);
                navigate('/');
            }}>Leave</button>
            {isUserLeaderCookies(players) &&
                <button onClick={() => {
                    handleDeleteRoom(roomName, client, setNotifications);
                    navigate('/');
                }}>delete room</button>}
            <div>
                {!error && players.map(player => (
                    <Player key={player.id} player={player} onCivChange={handleChangeCivilization}
                            onKick={(member) => handleKickMember(roomName, member, client, setNotifications)}
                            showKickButton={isUserLeaderCookies(players) && !player.isLeader}/>
                ))}
                {error && <p>{error.message}</p>}
            </div>
        </section>
    );

}