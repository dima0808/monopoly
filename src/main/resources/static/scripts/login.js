document.getElementById('loginForm').addEventListener('submit', function(event) {

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const requestBody = {
        login: login,
        password: password
    };

    console.log(requestBody);
    fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (response.status === 401) {
                throw new Error('Login failed: Unauthorized');
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                document.cookie = `token=${data.token}`
                alert('Good');
            } else {
                alert('Login failed: Invalid response from server');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });

    event.preventDefault();
});
