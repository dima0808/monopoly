document.addEventListener("DOMContentLoaded", function () {
    connect();
});

const roomsArea = document.querySelector('#rooms-area');

let stompClient = null;

function connect() {

    const socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
}

function onConnected() {

    stompClient.subscribe("/topic/public", onRoomMessageReceived);

    fetchAndDisplayRooms().then();
}

async function fetchAndDisplayRooms() {

    const roomsResponse = await fetch(`/rooms`);
    const rooms = await roomsResponse.json();

    rooms.forEach(room => {
       displayRoom(room);
    });
}

function displayRoom(room) {

    const roomContainer = document.createElement('div');
    roomContainer.setAttribute('id', `room-${room.id}`);

    const nameText = document.createElement('p');
    nameText.textContent = room.id + ') ' + room.name + ' - ' + room.size;
    roomContainer.appendChild(nameText);

    roomsArea.appendChild(roomContainer);
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

function sendRoom() {
    let name = document.getElementById('name').value;
    let size = document.getElementById('size').value;
    stompClient.send("/app/rooms/addRoom", {}, JSON.stringify({'name': name, 'size': size}));
}

function deleteRoom() {
    let roomId = document.getElementById('roomId').value;
    stompClient.send(`/app/rooms/deleteRoom/${roomId}`, {});
}

async function onRoomMessageReceived(payload) {
    const message = JSON.parse(payload.body);

    if (message.hasOwnProperty('name')) {
        displayRoom(message);
    } else {
        removeRoom(message);
    }
}