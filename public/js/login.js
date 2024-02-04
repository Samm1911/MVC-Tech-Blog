// function to handle the login
const loginFormHandler = async (event) => {
    event.preventDefault();

    // get the username and the password values from the input fields
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // if username and password received
    if (username && password) {
        // fetch on the login route, which posts the username and password
        const response = await fetch('/api/users/login', {
            method: 'POST',
            // send the username and the password
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // if login successful, send to the dashboard
        if (response.ok) {
            document.location.replace('/dashboard');
            // failed to login, if password or username wrong
        } else {
            alert('Failed to log in');
        }
    }
};

// add eventlistener to the login form and perform login function, once submitted
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);