import './styles.css';
import React, {useEffect, useState} from 'react';
import Lobby from "./Lobby";
import {getAllRooms} from '../../utils/http';
import CreateLobbyDialog from './CreateLobbyDialog';
import JoinLobbyDialog from './JoinLobbyDialog';
import Cookies from 'js-cookie';

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
        document.getElementById('modal').classList.remove('blur-modal');
        document.getElementById('root').classList.remove('blur-background');
    }

    function handleCreateClick() {
        setIsCreateDialogOpen(true);
        document.getElementById('modal').classList.add('blur-modal');
        document.getElementById('root').classList.add('blur-background');
    }

    function handleCreateRoom({name, size, password}) {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        if (!client || !client.publish) {
            setNotifications(prev => [...prev, {
                message: 'Client is not initialized or publish method is not available',
                duration: 3500,
                isError: true
            }]);
            return;
        }
        try {
            client.publish({
                destination: '/app/rooms/addRoom',
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username
                },
                body: JSON.stringify({name, size, password})
            });
            console.log('Creating lobby ' + name + ' size=' + size + '...');
        } catch (error) {
            setNotifications(prev => [...prev, {
                message: 'Error creating lobby (no connection)',
                duration: 3500,
                isError: true
            }]);
        }
    }

    function handleJoinClick(room) {
        if (room.password) {
            setRoomToJoin(room);
            setIsJoinDialogOpen(true);
            document.getElementById('modal').classList.add('blur-modal');
            document.getElementById('root').classList.add('blur-background');
        } else {
            handleJoinRoom(room.name);
        }
    }

    function handleJoinRoom(roomName, password = null) {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        if (!client || !client.publish) {
            setNotifications(prev => [...prev, {
                message: 'Client is not initialized or publish method is not available',
                duration: 3500,
                isError: true
            }]);
            return;
        }
        try {
            client.publish({
                destination: '/app/rooms/joinRoom/' + roomName,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username
                },
                body: JSON.stringify({password})
            });
            console.log('Joining lobby ' + roomName + '...');
        } catch (error) {
            setNotifications(prev => [...prev, {
                message: 'Error joining lobby (no connection)',
                duration: 3500,
                isError: true
            }]);
        }
    }

    function handleLeaveRoom(roomName) {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        if (!client || !client.publish) {
            setNotifications(prev => [...prev, {
                message: 'Client is not initialized or publish method is not available',
                duration: 3500,
                isError: true
            }]);
            return;
        }
        try {
            client.publish({
                destination: '/app/rooms/leaveRoom/' + roomName,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username
                }
            });
            console.log('Leaving lobby ' + roomName + '...');
        } catch (error) {
            setNotifications(prev => [...prev, {
                message: 'Error leaving lobby (no connection)',
                duration: 3500,
                isError: true
            }]);
        }
    }

    function handleKickMember(roomName, member) {
        const token = Cookies.get('token');
        const admin = Cookies.get('username');
        if (!client || !client.publish) {
            setNotifications(prev => [...prev, {
                message: 'Client is not initialized or publish method is not available',
                duration: 3500,
                isError: true
            }]);
            return;
        }
        try {
            client.publish({
                destination: `/app/rooms/kickMember/${roomName}/${member}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: admin
                }
            });
            console.log('Kicking member ' + member + ' from room ' + roomName + '...');
        } catch (error) {
            setNotifications(prev => [...prev, {
                message: 'Error kicking user (no connection)',
                duration: 3500,
                isError: true
            }]);
        }
    }

    function handleDeleteRoom(roomName) {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        if (!client || !client.publish) {
            setNotifications(prev => [...prev, {
                message: 'Client is not initialized or publish method is not available',
                duration: 3500,
                isError: true
            }]);
            return;
        }
        try {
            client.publish({
                destination: '/app/rooms/deleteRoom/' + roomName,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username
                }
            });
            console.log('Deleting lobby ' + roomName + '...');
        } catch (error) {
            setNotifications(prev => [...prev, {
                message: 'Error deleting lobby (no connection)',
                duration: 3500,
                isError: true
            }]);
        }
    }

    function isUserInRoom(room) {
        const username = Cookies.get('username');
        return room.members.some(member => member.user.username === username);
    }

    return (
        <section className="lobby">
            <CreateLobbyDialog
                isOpen={isCreateDialogOpen}
                onClose={handleDialogClose}
                onCreate={handleCreateRoom}
            />
            <JoinLobbyDialog
                isOpen={isJoinDialogOpen}
                onClose={handleDialogClose}
                onJoin={(password) => handleJoinRoom(roomToJoin.name, password)}
            />
            <div className="lobby__title title-box">
                <p className="title-box__p">Lobbies</p>
                <button className="create-btn" onClick={handleCreateClick}>Create</button>
            </div>
            <div className="lobby__area scroll">
                {!error && rooms
                    .sort((a, b) => isUserInRoom(b) - isUserInRoom(a))
                    .map((room) => (
                        <Lobby key={room.id} name={room.name} size={room.size}
                               onJoin={() => handleJoinClick(room)}
                               onLeave={() => handleLeaveRoom(room.name)}
                               onKick={(member) => handleKickMember(room.name, member)}
                               onDelete={() => handleDeleteRoom(room.name)}
                               room={room}/>
                    ))}
                {error && <p>{error.message}</p>}
            </div>
        </section>
    );
}