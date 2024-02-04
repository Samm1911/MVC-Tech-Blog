// logout function logs out user
const logout = async () => {
    // do a post request on the logout route
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    // if response okay redirect to homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out');
    }
};

// eventlistener for logout button
document.querySelector('#logout').addEventListener('click', logout);