import Cookies from "js-cookie";

export function isUserInRoom(members, username) {
    return members.some(member => member.user.username === username);
}

export function isUserInRoomCookies(members) {
    return isUserInRoom(members, Cookies.get('username'));
}

export function isUserLeader(members, username) {
    return members.some(member => member.user.username === username && member.isLeader);
}

export function isUserLeaderCookies(members) {
    return isUserLeader(members, Cookies.get('username'));
}

// lobby actions

export function handleCreateRoom({name, size, password}, client, setNotifications) {
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

export function handleJoinRoom(roomName, client, setNotifications, password = null) {
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

export function handleLeaveRoom(roomName, client, setNotifications) {
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

export function handleKickMember(roomName, member, client, setNotifications) {
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

export function handleDeleteRoom(roomName, client, setNotifications) {
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