export async function signUp({username, email, password}) {
    const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, email, password}),
    });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}

export async function signIn({login, password}) {
    const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({login, password}),
    });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}

export async function getAllRooms() {
    const response = await fetch('http://localhost:8080/api/rooms');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}

export async function getAllMessages(chatName, token, isPrivate = false) {
    const response = await fetch('http://localhost:8080/api/chat/' + (isPrivate ? 'private/' : '') + chatName, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData.sort((a, b) => a.id - b.id);
}

export async function getAllPlayers(roomName) {
    const response = await fetch('http://localhost:8080/api/rooms/' + roomName + '/members');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}

export async function getUser(nickname) {
    const response = await fetch('http://localhost:8080/api/users/' + nickname);
    const resData = await response.json();

    if (!response.ok) {
        const error = new Error(resData.message);
        error.status = response.status;
        throw error;
    }

    return resData;
}

export async function updateProfile({nickname, email, password}, token) {
    const response = await fetch('http://localhost:8080/api/users', {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({nickname, email, password}),
    });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}

export async function updateUser({
                                     username,
                                     nickname,
                                     email,
                                     password,
                                     elo,
                                     matchesPlayed,
                                     matchesWon,
                                     averagePlacement
                                 }, token) {

    const response = await fetch('http://localhost:8080/api/admin/users/' + username, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({nickname, email, password, elo, matchesPlayed, matchesWon, averagePlacement}),
    });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}

export async function getUserContacts(username, token) {
    const response = await fetch('http://localhost:8080/api/users/' + username + '/contacts', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}

export async function getAllUsers(token) {
    const response = await fetch('http://localhost:8080/api/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}

export async function getAllSuggestedContacts(username, token, suggestedNickname) {
    const response = await fetch('http://localhost:8080/api/users/' + username + '/contacts/suggested?nickname=' + suggestedNickname, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData;

}