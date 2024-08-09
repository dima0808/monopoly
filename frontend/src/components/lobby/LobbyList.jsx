import './styles.css';
import React, { useEffect, useState } from 'react';
import Lobby from "./Lobby";
import { getAllRooms } from '../../http';
import CreateLobbyDialog from './CreateLobbyDialog';
import Cookies from 'js-cookie';

export default function LobbyList({ client, isConnected }) {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function onRoomMessageReceived(message) {
        const { type, content, room } = JSON.parse(message.body);
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
        getAllRooms().then(setRooms)
            .catch((error) => setError({ message: error.message || "An error occurred" }));

        if (client && isConnected) {
            const subscription = client.subscribe('/topic/public', onRoomMessageReceived);

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [client, isConnected]);

    function handleCreateClick() {
        setIsDialogOpen(true);
        document.getElementById('modal').classList.add('blur-modal');
        document.getElementById('root').classList.add('blur-background');
    }

    function handleDialogClose() {
        setIsDialogOpen(false);
        document.getElementById('modal').classList.remove('blur-modal');
        document.getElementById('root').classList.remove('blur-background');
    }

    function handleCreateLobby({ name, size }) {
       const token = Cookies.get('token');
       const username = Cookies.get('username');
       if (!client || !client.publish) {
           console.error('Client is not initialized or publish method is not available');
           return;
       }
       try {
           client.publish({
               destination: '/app/rooms/addRoom',
               headers: {
                   Authorization: `Bearer ${token}`,
                   username: username
               },
               body: JSON.stringify({ name, size })
           });
           console.log('Creating room ' + name + ' size=' + size + '...');
       } catch (error) {
           console.error('Error creating lobby: ', error);
       }
    }

    function handleJoinRoom(roomId) {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        if (!client || !client.publish) {
            console.error('Client is not initialized or publish method is not available');
            return;
        }
        try {
            client.publish({
                destination: '/app/rooms/joinRoom/' + roomId,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username
                }
            });
            console.log('Joining room ' + roomId + '...');
        } catch (error) {
            console.error('Error joining room: ', error);
        }
    }

    function handleLeaveRoom(roomId) {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        if (!client || !client.publish) {
            console.error('Client is not initialized or publish method is not available');
            return;
        }
        try {
            client.publish({
                destination: '/app/rooms/leaveRoom/' + roomId,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username
                }
            });
            console.log('Leaving room ' + roomId + '...');
        } catch (error) {
            console.error('Error leaving room: ', error);
        }
    }

    function handleKickMember(roomId, member) {
        const token = Cookies.get('token');
        const admin = Cookies.get('username');
        if (!client || !client.publish) {
            console.error('Client is not initialized or publish method is not available');
            return;
        }
        try {
            client.publish({
                destination: `/app/rooms/kickMember/${roomId}/${member}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: admin
                }
            });
            console.log('Kicking member ' + member + ' from room ' + roomId + '...');
        } catch (error) {
            console.error('Error kicking user: ', error);
        }
    }

    function handleDeleteRoom(roomId) {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        if (!client || !client.publish) {
            console.error('Client is not initialized or publish method is not available');
            return;
        }
        try {
            client.publish({
                destination: '/app/rooms/deleteRoom/' + roomId,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username
                }
            });
            console.log('Deleting room ' + roomId + '...');
        } catch (error) {
            console.error('Error deleting room: ', error);
        }
    }

    function isUserInRoom(room) {
        const username = Cookies.get('username');
        return room.members.some(member => member.user.username === username);
    }

    return (
        <section className="lobby">
            <CreateLobbyDialog
                isOpen={isDialogOpen}
                onClose={handleDialogClose}
                onCreate={handleCreateLobby}
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
                               onJoin={() => handleJoinRoom(room.id)}
                               onLeave={() => handleLeaveRoom(room.id)}
                               onKick={(member) => handleKickMember(room.id, member)}
                               onDelete={() => handleDeleteRoom(room.id)}
                               room={room}/>
                    ))}
                {error && <p>{error.message}</p>}
            </div>
        </section>
    );
}