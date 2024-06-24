function getAuthToken() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token') {
            return value;
        }
    }
    return null;
}

function getUsername() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'username') {
            return value;
        }
    }
    return null;
}

document.addEventListener("DOMContentLoaded", function () {
    connect();
});

const roomInfoArea = document.querySelector('#room-info-area');
let stompClient = null;
let roomId;

function connect() {

    const socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({Authorization: `Bearer ${getAuthToken()}`}, onConnected, onError);
}

function onConnected() {
    fetchRoom().then(room => {
        roomId = room.id;

        const urlParams = new URLSearchParams(window.location.search);
        if (roomId !== parseInt(urlParams.get('roomId'))) {
            alert('Invalid room id');
            window.location.href = '/';
            return;
        }

        fetchAndDisplayRoomInfo(roomId).then();

        stompClient.subscribe(`/topic/public/${roomId}`, onRoomMessageReceived);
        stompClient.subscribe('/user/' + getUsername() + '/queue/errors', onErrorReceived);
        stompClient.subscribe('/user/' + getUsername() + '/queue/notifications', onNotificationReceived);
    }).catch(error => {
        console.error('Error fetching room:', error);
    });

}

async function fetchRoom() {
    const roomResponse = await fetch(`/api/user/room`, {
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    });

    if (!roomResponse.ok) {
        throw new Error(`Error fetching room: ${roomResponse.statusText}`);
    }

    return await roomResponse.json();
}

async function fetchAndDisplayRoomInfo(roomId) {

    const roomResponse = await fetch(`/api/rooms/${roomId}`);
    const room = await roomResponse.json();

    const roomName = document.createElement('h3');
    roomName.textContent = room.name;
    roomInfoArea.appendChild(roomName);

    const deleteRoomButton = document.createElement('button');
    deleteRoomButton.textContent = 'Delete room';
    deleteRoomButton.classList.add('delete-room-button');
    deleteRoomButton.setAttribute('hidden', 'true');
    roomInfoArea.appendChild(deleteRoomButton);

    displayRoomMembers(room);

    const startGameButton = document.createElement('button');
    startGameButton.textContent = 'START';
    roomInfoArea.appendChild(startGameButton);
}

function displayRoomMembers(room) {
    const existingMemberList = roomInfoArea.querySelector('ul');
    const membersList = document.createElement('ul');

    for (let i = 0; i < room.members.length; i++) {
        const memberItem = document.createElement('li');
        memberItem.setAttribute('id', `room-${room.id}-member-${i + 1}`);

        if (i === 0) {
            memberItem.textContent = `Creator: ${room.members[i].username} `;
        } else {
            memberItem.textContent = `Member: ${room.members[i].username} `;
            if (getUsername() === room.members[0].username) {
                let kickButton = document.createElement('button');
                kickButton.textContent = 'kick';
                kickButton.classList.add('kick-member-button');
                kickButton.id = `${room.id}-${room.members[i].username}`
                memberItem.appendChild(kickButton);
            }
        }

        if (getUsername() === room.members[i].username) {
            let leaveButton = document.createElement('button');
            leaveButton.textContent = 'leave';
            leaveButton.classList.add('leave-room-button');
            memberItem.appendChild(leaveButton);
        }

        membersList.appendChild(memberItem);
    }

    if (existingMemberList) {
        existingMemberList.innerHTML = membersList.innerHTML;
    } else {
        roomInfoArea.appendChild(membersList);
    }

    activateButtons(room);
}

function activateButtons(room) {
    const deleteRoomButton = roomInfoArea.querySelector('.delete-room-button');
    if (getUsername() === room.members[0].username) {
        deleteRoomButton.removeAttribute('hidden');
        deleteRoomButton.addEventListener('click', () => {
            deleteRoom(room.id);
        });
    } else {
        deleteRoomButton.setAttribute('hidden', 'true');
    }

    const leaveButtons = roomInfoArea.querySelectorAll('.leave-room-button');
    leaveButtons.forEach(leaveButton => {
        leaveButton.addEventListener('click', () => {
            leaveRoom(room.id);
        });
    });

    const kickButtons = roomInfoArea.querySelectorAll('.kick-member-button');
    kickButtons.forEach(kickButton => {
        kickButton.addEventListener('click', () => {
            kickMember(kickButton.id.split('-')[0], kickButton.id.split('-')[1]);
        });
    });
}

function deleteRoom(roomId) {
    stompClient.send(`/app/rooms/deleteRoom/${roomId}`,
        {
            Authorization: `Bearer ${getAuthToken()}`,
            username: getUsername()
        });
    window.location.href = '/';
}

function leaveRoom(roomId) {
    stompClient.send(`/app/rooms/leaveRoom/${roomId}`,
        {
            Authorization: `Bearer ${getAuthToken()}`,
            username: getUsername()
        })
    window.location.href = '/';
}

function kickMember(roomId, member) {
    stompClient.send(`/app/rooms/kickMember/${roomId}/${member}`,
        {
            Authorization: `Bearer ${getAuthToken()}`,
            username: getUsername()
        });
}

function onError() {
    roomInfoArea.innerHTML = 'Failed to connect';
}

function showNotification(notification) {
    console.log('Notification:', notification);
    alert(notification);
    if (notification === 'You have been kicked from the room') {
        window.location.href = '/';
    }
}

function onRoomMessageReceived(payload) {
    const message = JSON.parse(payload.body);

    if (message.hasOwnProperty('members')) {
        displayRoomMembers(message);
    } else {
        window.location.href = '/';
    }
}

function onNotificationReceived(payload) {
    showNotification(payload.body);
}

function onErrorReceived(payload) {
    const error = JSON.parse(payload.body);
    console.error("Error received: ", error.message);
    alert(`Error: ${error.message}`);
}