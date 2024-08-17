import './styles.css';
import React, {useEffect, useState} from 'react';
import Lobby from "./Lobby";
import {getAllRooms} from '../../utils/http';
import CreateLobbyDialog from './CreateLobbyDialog';
import JoinLobbyDialog from './JoinLobbyDialog';
import {
    handleCreateRoom,
    handleDeleteRoom,
    handleJoinRoom,
    handleKickMember,
    handleLeaveRoom,
    isUserInRoom
} from "../../utils/lobby";

export default function LobbyList({client, isConnected, setNotifications}) {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
    const [roomToJoin, setRoomToJoin] = useState(null);

    function onRoomMessageReceived(message) {
        const {type, content, room} = JSON.parse(message.body);
        console.log(content);
        setRooms((prevRooms) => {
            switch (type) {
                case 'CREATE':
                    return [...prevRooms, room];
                case 'JOIN':
                case 'LEAVE':
                case 'KICK':
                    return prevRooms.map(tempRoom =>
                        tempRoom.id === room.id ? room : tempRoom
                    );
                case 'DELETE':
                    return prevRooms.filter(tempRoom => tempRoom.id !== room.id);
                default:
                    return prevRooms;
            }
        });
    }

    useEffect(() => {
        if (client && isConnected) {
            getAllRooms().then(setRooms)
                .catch((error) => setError({message: error.message || "An error occurred"}));
            const subscription = client.subscribe('/topic/public', onRoomMessageReceived);
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [client, isConnected]);

    function handleDialogClose() {
        setIsCreateDialogOpen(false);
        setIsJoinDialogOpen(false);
    }

    function handleCreateClick() {
        setIsCreateDialogOpen(true);
    }

    function handleJoinClick(room) {
        if (room.password) {
            setRoomToJoin(room);
            setIsJoinDialogOpen(true);
        } else {
            handleJoinRoom(room.name, client, setNotifications);
        }
    }

    return (
        <section className="lobby">
            <CreateLobbyDialog
                isOpen={isCreateDialogOpen}
                onClose={handleDialogClose}
                onCreate={({name, size, password}) => handleCreateRoom({
                    name,
                    size,
                    password
                }, client, setNotifications)}
            />
            <JoinLobbyDialog
                isOpen={isJoinDialogOpen}
                onClose={handleDialogClose}
                onJoin={(password) => handleJoinRoom(roomToJoin.name, client, setNotifications, password)}
            />
            <div className="lobby__title title-box">
                <p className="title-box__p">Lobbies</p>
                <button className="create-btn" onClick={handleCreateClick}>Create</button>
            </div>
            <div className="lobby__area scroll">
                {!error && rooms
                    .sort((a, b) => isUserInRoom(b.members) - isUserInRoom(a.members))
                    .map((room) => (
                        <Lobby key={room.id}
                               onJoin={() => handleJoinClick(room)}
                               onLeave={() => handleLeaveRoom(room.name, client, setNotifications)}
                               onKick={(member) => handleKickMember(room.name, member, client, setNotifications)}
                               onDelete={() => handleDeleteRoom(room.name, client, setNotifications)}
                               room={room}/>
                    ))}
                {error && <p>{error.message}</p>}
            </div>
        </section>
    );
}