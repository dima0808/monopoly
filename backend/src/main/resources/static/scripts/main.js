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

const roomsArea = document.querySelector('#rooms-area');

let stompClient = null;

function connect() {

    const socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({Authorization: `Bearer ${getAuthToken()}`}, onConnected, onError);
}

function onConnected() {

    stompClient.subscribe('/topic/public', onRoomMessageReceived);
    stompClient.subscribe('/user/' + getUsername() + '/queue/errors', onErrorReceived);
    stompClient.subscribe('/user/' + getUsername() + '/queue/notifications', onNotificationReceived);

    fetchAndDisplayRooms().then();
}

async function fetchAndDisplayRooms() {

    const roomsResponse = await fetch(`/api/rooms`);
    const rooms = await roomsResponse.json();

    rooms.forEach(room => {
       displayRoom(room);
    });
}

function displayRoom(room) {
    const roomContainer = document.createElement('div');
    roomContainer.setAttribute('id', `room-${room.id}`);

    const nameElement = document.createElement('p');
    nameElement.textContent = `${room.id}) Name: ${room.name}`;
    roomContainer.appendChild(nameElement);

    const sizeElement = document.createElement('p');
    sizeElement.textContent = `Size: ${room.size}`;
    roomContainer.appendChild(sizeElement);

    const deleteRoomButton = document.createElement('button');
    deleteRoomButton.textContent = 'Delete room';
    deleteRoomButton.classList.add('delete-room-button');
    deleteRoomButton.setAttribute('hidden', 'true');
    roomContainer.appendChild(deleteRoomButton);

    const lobbyButton = document.createElement('button');
    lobbyButton.textContent = 'To lobby';
    lobbyButton.classList.add('lobby-button');
    lobbyButton.setAttribute('hidden', 'true');
    roomContainer.appendChild(lobbyButton);

    roomsArea.appendChild(roomContainer);

    displayRoomMembers(room);
}

function displayRoomMembers(room) {
    const roomContainer = document.querySelector(`#room-${room.id}`);
    const existingMemberList = roomContainer.querySelector('ul');
    const membersList = document.createElement('ul');

    for (let i = 0; i < room.members.length; i++) {
        const memberItem = document.createElement('li');
        memberItem.setAttribute('id', `room-${room.id}-member-${room.members[i].user.username}`);

        if (i === 0) {
            memberItem.textContent = `Creator: ${room.members[i].user.username} `;
        } else {
            memberItem.textContent = `Member: ${room.members[i].user.username} `;
            if (getUsername() === room.members[0].user.username) {
                let kickButton = document.createElement('button');
                kickButton.textContent = 'kick';
                kickButton.classList.add('kick-member-button');
                kickButton.id = `${room.id}-${room.members[i].user.username}`
                memberItem.appendChild(kickButton);
            }
        }

        if (getUsername() === room.members[i].user.username) {
            let leaveButton = document.createElement('button');
            leaveButton.textContent = 'leave';
            leaveButton.classList.add('leave-room-button');
            memberItem.appendChild(leaveButton);
        }

        membersList.appendChild(memberItem);
    }

    for (let i = room.members.length; i < room.size; i++) {
        const memberItem = document.createElement('li');
        memberItem.setAttribute('id', `room-${room.id}-member-${i + 1}`);

        const joinButton = document.createElement('button');
        joinButton.textContent = '+';
        joinButton.classList.add('join-room-button');
        memberItem.appendChild(joinButton);

        membersList.appendChild(memberItem);
    }

    if (existingMemberList) {
        existingMemberList.innerHTML = membersList.innerHTML;
    } else {
        roomContainer.appendChild(membersList);
    }

    activateButtons(room);
}

function activateButtons(room) {
    const roomContainer = document.getElementById(`room-${room.id}`);
    const lobbyButton = roomContainer.querySelector('.lobby-button');
    if (room.members.some(member => member.user.username === getUsername())) {
        lobbyButton.removeAttribute('hidden');
        lobbyButton.addEventListener('click', () => {
            window.location.href = '/room.html?roomId=' + room.id;
        });
    } else {
        lobbyButton.setAttribute('hidden', 'true');
    }

    const deleteRoomButton = roomContainer.querySelector('.delete-room-button');
    if (getUsername() === room.members[0].user.username) {
        deleteRoomButton.removeAttribute('hidden');
        deleteRoomButton.addEventListener('click', () => {
            deleteRoom(room.id);
        });
    } else {
        deleteRoomButton.setAttribute('hidden', 'true');
    }

    const joinButtons = roomContainer.querySelectorAll('.join-room-button');
    joinButtons.forEach(joinButton => {
        joinButton.addEventListener('click', () => {
            joinRoom(room.id);
        });
    });

    const leaveButtons = roomContainer.querySelectorAll('.leave-room-button');
    leaveButtons.forEach(leaveButton => {
        leaveButton.addEventListener('click', () => {
            leaveRoom(room.id);
        });
    });

    const kickButtons = roomContainer.querySelectorAll('.kick-member-button');
    kickButtons.forEach(kickButton => {
        kickButton.addEventListener('click', () => {
            kickMember(kickButton.id.split('-')[0], kickButton.id.split('-')[1]);
        });
    });
}

function removeRoom(roomId) {
    const roomContainer = document.getElementById(`room-${roomId}`);
    if (roomContainer) {
        roomsArea.removeChild(roomContainer);
    }
}

function addRoom() {
    let name = document.getElementById('name').value;
    let size = document.getElementById('size').value;
    stompClient.send("/app/rooms/addRoom",
        {
            Authorization: `Bearer ${getAuthToken()}`,
            username: getUsername()
        },
        JSON.stringify({'name': name, 'size': size}));
}

function deleteRoom(roomId) {
    stompClient.send(`/app/rooms/deleteRoom/${roomId}`,
        {
            Authorization: `Bearer ${getAuthToken()}`,
            username: getUsername()
        });
}

function joinRoom(roomId) {
    stompClient.send(`/app/rooms/joinRoom/${roomId}`,
        {
            Authorization: `Bearer ${getAuthToken()}`,
            username: getUsername()
        });
}

function leaveRoom(roomId) {
    stompClient.send(`/app/rooms/leaveRoom/${roomId}`,
        {
            Authorization: `Bearer ${getAuthToken()}`,
            username: getUsername()
        });
}

function kickMember(roomId, member) {
    stompClient.send(`/app/rooms/kickMember/${roomId}/${member}`,
        {
            Authorization: `Bearer ${getAuthToken()}`,
            username: getUsername()
        });
}

function onError() {
    roomsArea.innerHTML = 'Failed to connect';
}

function showNotification(notification) {
    console.log('Notification:', notification);
    alert(notification);
}

function onRoomMessageReceived(payload) {
    const message = JSON.parse(payload.body);

    if (message.hasOwnProperty('members')) {
        const existingRoomContainer = document.getElementById(`room-${message.id}`);
        if (existingRoomContainer) {
            displayRoomMembers(message);
        } else {
            displayRoom(message);
        }
    } else {
        removeRoom(message);
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