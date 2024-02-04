// signup form to signup a new user 
const signupForm = async (event) => {
    event.preventDefault();
    // get username and password values rom input field
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // when username and password received post to signup route
        if (username && password) {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                // stringify with json
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // redirect to dashboard after signup
            if (response.ok) {
                window.location.replace('/dashboard');
        } else {
            alert('Failed to sign up User!');
        }
    }
 }

// submit signup form
document.querySelector('.signup-form').addEventListener('submit', signupForm);

