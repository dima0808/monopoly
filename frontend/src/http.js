export async function signUp({ username, email, password }) {
    const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }

    return resData;
}

export async function signIn({ login, password }) {
    const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
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