document.getElementById('registerForm').addEventListener('submit', function(event) {

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const requestBody = {
        username: username,
        email: email,
        password: password
    };

    fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    alert('Good');

    event.preventDefault();
});
