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

    stompClient.subscribe("/topic/public", onRoomMessageReceived);
    stompClient.subscribe("/user/queue/errors", onErrorReceived);

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

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
        deleteRoom(room.id);
    });
    roomContainer.appendChild(deleteButton);

    const nameElement = document.createElement('p');
    nameElement.textContent = `${room.id}) Name: ${room.name}`;
    roomContainer.appendChild(nameElement);

    const sizeElement = document.createElement('p');
    sizeElement.textContent = `Size: ${room.size}`;
    roomContainer.appendChild(sizeElement);

    roomsArea.appendChild(roomContainer);

    displayRoomMembers(room);
}

function displayRoomMembers(room) {
    const roomContainer = document.querySelector(`#room-${room.id}`);
    const existingMemberList = roomContainer.querySelector('ul');
    const membersList = document.createElement('ul');

    for (let i = 0; i < room.members.length; i++) {
        const memberItem = document.createElement('li');
        memberItem.setAttribute('id', `room-${room.id}-member-${i + 1}`);

        if (i === 0) {
            memberItem.textContent = `Creator: ${room.members[i].username}`;
        } else {
            memberItem.textContent = `Member: ${room.members[i].username}`;
        }

        membersList.appendChild(memberItem);
    }

    for (let i = room.members.length; i < room.size; i++) {
        const memberItem = document.createElement('li');
        memberItem.setAttribute('id', `room-${room.id}-member-${i + 1}`);

        const joinButton = document.createElement('button');
        joinButton.textContent = '+';
        joinButton.addEventListener('click', () => {
            joinRoom(room.id)
        });
        memberItem.appendChild(joinButton);

        membersList.appendChild(memberItem);
    }

    if (existingMemberList) {
        existingMemberList.innerHTML = membersList.innerHTML;
    } else {
        roomContainer.appendChild(membersList);
    }
}


function removeRoom(roomId) {
    const roomElement = document.getElementById(`room-${roomId}`);
    if (roomElement) {
        roomsArea.removeChild(roomElement);
    }
}

function onError() {
    roomsArea.innerHTML = 'Failed to connect';
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

async function onRoomMessageReceived(payload) {
    const message = JSON.parse(payload.body);

    if (message.hasOwnProperty('id')) {
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

function onErrorReceived(payload) {
    const error = JSON.parse(payload.body);
    console.error("Error received: ", error.message);
    alert(`Error: ${error.message}`);
}